import React, { useEffect, useState } from "react";
import { getRandomWordofLength } from "../../../pages/api/wordAPI";
import Board from "../Board/board";

import styles from "./game.module.scss";

const Game = () => {
    const [solution, setSolution] = useState(null);

    const getRandomFiveLetterWord = async () => {
        const response = await getRandomWordofLength(5);
        setSolution(response);
    };

    const handleReplay = async () => {
        setSolution(null);
    };

    useEffect(() => {
        if (!solution) getRandomFiveLetterWord();
    }, [solution]);

    return (
        <div className={styles.container}>
            {solution ? (
                <div className={styles.gameContainer}>
                    <div className={styles.gameHeader}>Wordle Clone</div>

                    <Board solution={solution} handleReplay={handleReplay} />
                </div>
            ) : (
                <div>Generating word...</div>
            )}
        </div>
    );
};

export default Game;
