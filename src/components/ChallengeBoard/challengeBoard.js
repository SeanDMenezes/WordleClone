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
    selectActiveRow,
    selectChallengeID,
    selectKeyColors,
    selectRows,
    selectTimer,
} from "../../redux/game/gameSelector";
import {
    incrementTimer,
    pauseTimer,
    resumeTimer,
    setActiveRow,
    setKeyColors,
    setRows,
} from "../../redux/game/gameActions";

// api
import { getChallenge, setPlayerStats } from "../../../pages/api/challengeAPI";

// styling
import styles from "../Board/board.module.scss";
import styles2 from "./challengeBoard.module.scss";

const Row = ({ values, colors, idx }) => {
    return (
        <div key={idx} className={styles.boardRow}>
            {values.map((value, i) => (
                <Square key={i} color={colors[i]} value={value} />
            ))}
        </div>
    );
};

const ChallengeBoard = ({
    challengeID,
    rows, setRows,
    keyColors, setKeyColors,
    activeRowIdx, setActiveRowIdx,
    timer, incrementTimer, pauseTimer, resumeTimer,
}) => {
    const [words, setWords] = useState([]);
    const [timeNumWords, setTimeNumWords] = useState(0);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [wordLength, setWordLength] = useState(5);
    const [numGuesses, setNumGuesses] = useState(6);
    const [turnsTaken, setTurnsTaken] = useState(0);
    const [nickname, setNickname] = useState("");
    const [solution, setSolution] = useState("");
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const keyHandler = async ({ key }) => {
        if (gameOver || alreadyPlayed) return;
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

    const handleNextWord = () => {
        setLoading(false);
        setGameOver(false);
        setHasWon(false);
        setActiveRowIdx(0);
        setRows(generateBlankGrid(wordLength, numGuesses));
        setKeyColors({});
        setError("");
        setSolution(words[currentIdx + 1]);
        setCurrentIdx(currentIdx + 1);
        resumeTimer();
    };

    const getWords = async () => {
        const challenge = await getChallenge(challengeID);
        if (!challenge || (challenge.error && challenge.error !== "")) {
            setSolution(null);
            return;
        }
        const { words } = challenge;
        const length = words[0].length;
        setWords(words);
        setTimeNumWords(words.length);
        setSolution(words[currentIdx]);
        setWordLength(length);
        setNumGuesses(length + 1);
        resumeTimer();
    };

    const handleScoreSubmit = async () => {
        await setPlayerStats(challengeID, nickname, timer, turnsTaken);
        let playedIDs = JSON.parse(localStorage.getItem("playedList"));
        if (!playedIDs) playedIDs = [];
        playedIDs.push(challengeID);
        localStorage.setItem("playedList", JSON.stringify(playedIDs));
        setSubmitted(true);
    };

    useEffect(() => {
        if (gameOver) {
            pauseTimer();
            setTimeNumWords(timeNumWords - 1);
            setTurnsTaken(turnsTaken + activeRowIdx);
            if (!hasWon) {
                const newTime = parseFloat(timer) + 300.0;
                resumeTimer();
                incrementTimer(parseFloat(newTime).toFixed(1));
                pauseTimer();
            }
        }
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

    // useEffect(() => {
    //     console.log(solution);
    // }, [solution]);

    useEffect(() => {
        const playedIDs = localStorage.getItem("playedList");
        if (playedIDs && playedIDs.includes(challengeID)) {
            setAlreadyPlayed(true);
            setGameOver(true);
        }
        getWords();
    }, []);

    useEventListener("keydown", keyHandler);

    if (!solution) return <div>No Challenge With that ID found</div>;
    if (alreadyPlayed)
        return <div>You have already completed this challenge!</div>;

    return (
        <div className={styles.boardContainer}>
            {!gameOver ? <span>{timer}</span> : <> </>}
            {loading ? (
                <span className={styles.loadingMessage}>
                    {" "}
                    Checking word...{" "}
                </span>
            ) : (
                <></>
            )}
            {gameOver ? (
                timeNumWords > 0 ? (
                    <button
                        className={styles2.nextWord}
                        onClick={handleNextWord}
                    >
                        {`Next Word (${timeNumWords} remaining)`}
                    </button>
                ) : (
                    <div>
                        {submitted ? (
                            <div>Score submitted!</div>
                        ) : (
                            <>
                                <input
                                    className={styles2.nickname}
                                    placeholder={"Submit a nickname"}
                                    value={nickname}
                                    onChange={(e) =>
                                        setNickname(e.target.value)
                                    }
                                />
                                <button onClick={handleScoreSubmit}>
                                    {" "}
                                    Submit{" "}
                                </button>
                            </>
                        )}
                    </div>
                )
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
                        hasWon
                            ? "You guessed the word!"
                            : "You Lose. 5 minutes will be added to your overall time"
                    } The word was ${solution}.`}{" "}
                    <br />
                    {`Overall Time: ${timer}`} <br />
                    {`Overall Number of Turns: ${turnsTaken}`}
                </span>
            ) : (
                <></>
            )}

            <Keyboard keyColors={keyColors} onKeyClick={keyHandler} />
        </div>
    );
};

const mapState = createStructuredSelector({
    challengeID: selectChallengeID,
    timer: selectTimer,
    rows: selectRows,
    keyColors: selectKeyColors,
    activeRowIdx: selectActiveRow,
});

const mapDispatch = (dispatch) => ({
    incrementTimer: (stepAmount) => dispatch(incrementTimer(stepAmount)),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    setRows: (rows) => dispatch(setRows(rows)),
    setKeyColors: (keyColors) => dispatch(setKeyColors(keyColors)),
    setActiveRowIdx: (activeRow) => dispatch(setActiveRow(activeRow)),
});

export default connect(mapState, mapDispatch)(ChallengeBoard);
