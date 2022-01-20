import React, { useEffect, useState } from "react";
import useEventListener from "@use-it/event-listener";
import _ from "lodash";

// components
import Square from "../Square/square";

// helpers
import { checkWin, handleInput } from "../../helpers/boardHelper";
import { COLORS } from "../../types/colors";

// styling
import styles from "./board.module.scss";
import Keyboard from "../Keyboard/keyboard";

const BLANK_ROWS = Array(6)
    .fill()
    .map((_) => ({
        values: ["", "", "", "", ""],
        colors: [
            COLORS.BLANK,
            COLORS.BLANK,
            COLORS.BLANK,
            COLORS.BLANK,
            COLORS.BLANK,
        ],
    }));

const Row = ({ values, colors, idx }) => {
    return (
        <div key={idx} className={styles.boardRow}>
            {values.map((value, i) => (
                <Square key={i} color={colors[i]} value={value} />
            ))}
        </div>
    );
};

const Board = ({ solution, handleReplay }) => {
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [activeRowIdx, setActiveRowIdx] = useState(0);
    const [rows, setRows] = useState(_.cloneDeep(BLANK_ROWS));
    const [keyColors, setKeyColors] = useState({});
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
        setRows(_.cloneDeep(BLANK_ROWS));
        setKeyColors({});
        setError("");
        handleReplay();
    };

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

    useEventListener("keydown", keyHandler);

    return (
        <div className={styles.boardContainer}>
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
            {error !== "" && !loading ? (
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
                    } The word was ${solution}.`}
                </span>
            ) : (
                <></>
            )}

            <Keyboard keyColors={keyColors} onKeyClick={keyHandler} />
        </div>
    );
};

export default Board;
