import React, { useEffect, useState } from "react";
import useEventListener from "@use-it/event-listener";
import _ from "lodash";

// components
import Square from "../Square/square";
import Keyboard from "../Keyboard/keyboard";

// helpers
import {
    checkWin,
    generateBlankGrid,
    handleInput,
} from "../../helpers/boardHelper";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
    selectIsTimeTrial,
    selectNumGuesses,
    selectWordLength,
} from "../../redux/options/optionsSelector";
import {
    selectActiveRow,
    selectKeyColors,
    selectRows,
    selectSolution,
    selectTimer,
} from "../../redux/game/gameSelector";
import {
    incrementTimer,
    pauseTimer,
    resetTimer,
    resumeTimer,
    setActiveRow,
    setKeyColors,
    setRows,
} from "../../redux/game/gameActions";

// styling
import styles from "./board.module.scss";

const Row = ({ values, colors, idx }) => {
    return (
        <div key={idx} className={styles.boardRow}>
            {values.map((value, i) => (
                <Square key={i} color={colors[i]} value={value} />
            ))}
        </div>
    );
};

const Board = ({
    solution,
    rows, setRows,
    keyColors, setKeyColors,
    activeRowIdx, setActiveRowIdx,
    isTimeTrial,
    timer, incrementTimer, pauseTimer, resumeTimer, resetTimer,
    handleReplay,
    wordLength,
    numGuesses,
}) => {
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [error, setError] = useState("");

    const keyHandler = async ({ key }) => {
        if (gameOver) return;
        setLoading(true);
        const newRows = await handleInput(
            key,
            activeRowIdx,
            [...rows],
            _.cloneDeep(keyColors),
            setActiveRowIdx,
            setKeyColors,
            setError,
            solution
        );
        setRows([...newRows]);
        setLoading(false);
    };

    const handlePlayAgain = () => {
        setLoading(false);
        setGameOver(false);
        setHasWon(false);
        setActiveRowIdx(0);
        setRows(generateBlankGrid(wordLength, numGuesses));
        setKeyColors({});
        setError("");
        resumeTimer();
        resetTimer();
        handleReplay();
    };

    useEffect(() => {
        if (gameOver) pauseTimer();
    }, [gameOver]);

    // checks if game is over or not
    useEffect(() => {
        if (activeRowIdx >= rows.length) {
            setGameOver(true);
            setHasWon(checkWin(activeRowIdx, rows, solution));
        } else if (activeRowIdx > 0) {
            const winner = checkWin(activeRowIdx, rows, solution);
            setGameOver(winner);
            setHasWon(winner);
        }
    }, [activeRowIdx]);

    useEffect(() => {
        setRows(generateBlankGrid(wordLength, numGuesses));
    }, [wordLength]);

    useEffect(() => {
        setTimeout(() => {
            const newTime = parseFloat(timer) + 0.1;
            incrementTimer(parseFloat(newTime).toFixed(1));
        }, 100);
    });

    useEventListener("keydown", keyHandler);

    return (
        <div className={styles.boardContainer}>
            {isTimeTrial && !gameOver ? <span>{timer}</span> : <> </>}
            {loading ? (
                <span className={styles.loadingMessage}>
                    {" "}
                    Checking word...{" "}
                </span>
            ) : (
                <></>
            )}
            {gameOver ? (
                <button className={styles.playAgain} onClick={handlePlayAgain}>
                    Play Again
                </button>
            ) : (
                <></>
            )}
            {error !== "" && !loading && !gameOver ? (
                <div className={styles.errorMessage}> {error} </div>
            ) : (
                <></>
            )}
            <div className={styles.rowContainer}>
                {rows &&
                    rows.map((row, idx) => (
                        <Row
                            key={idx}
                            values={row.values}
                            colors={row.colors}
                            idx={idx}
                        />
                    ))}
            </div>

            {gameOver ? (
                <span className={styles.gameOverMessage}>
                    {`${
                        hasWon ? "You Win!" : "You Lose."
                    } The word was ${solution}.\n`}
                    {isTimeTrial ? `Time taken: ${timer}` : ""}
                </span>
            ) : (
                <></>
            )}

            <Keyboard keyColors={keyColors} onKeyClick={keyHandler} />
        </div>
    );
};

const mapState = createStructuredSelector({
    wordLength: selectWordLength,
    numGuesses: selectNumGuesses,
    solution: selectSolution,
    isTimeTrial: selectIsTimeTrial,
    timer: selectTimer,
    rows: selectRows,
    keyColors: selectKeyColors,
    activeRowIdx: selectActiveRow,
});

const mapDispatch = (dispatch) => ({
    incrementTimer: (stepAmount) => dispatch(incrementTimer(stepAmount)),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    resetTimer: () => dispatch(resetTimer()),
    setRows: (rows) => dispatch(setRows(rows)),
    setKeyColors: (keyColors) => dispatch(setKeyColors(keyColors)),
    setActiveRowIdx: (activeRow) => dispatch(setActiveRow(activeRow)),
});

export default connect(mapState, mapDispatch)(Board);
