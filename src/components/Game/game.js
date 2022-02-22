import React, { useEffect } from "react";

// components
import Board from "../Board/board";
import GameHeader from "./GameHeader/GameHeader";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setNewSolution } from "../../redux/game/gameActions";
import { selectSolution } from "../../redux/game/gameSelector";

// styling
import styles from "./game.module.scss";

const Game = ({ solution, setNewSolution }) => {
    const getRandomWord = async () => {
        await setNewSolution();
    };

    const handleReplay = async () => {
        await setNewSolution();
    };

    useEffect(() => {
        if (!solution) getRandomWord();
    }, [solution]);

    return (
        <div className={styles.container}>
            {solution ? (
                <div className={styles.gameContainer}>
                    <GameHeader />
                    <Board handleReplay={handleReplay} />
                </div>
            ) : (
                <div>Generating word...</div>
            )}
        </div>
    );
};

const mapState = createStructuredSelector({
    solution: selectSolution
});

const mapDispatch = dispatch => ({
    setNewSolution: () => dispatch(setNewSolution())
});

export default connect(mapState, mapDispatch)(Game);
