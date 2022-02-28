import { store } from "../store";
import { GAME_ACTION_TYPES } from "./gameTypes";

import { getRandomWordofLength } from "../../../pages/api/wordAPI";
import { generateBlankGrid } from "../../helpers/boardHelper";

export const setLoading = (loading) => ({
    type: GAME_ACTION_TYPES.SET_LOADING,
    payload: loading,
});

export const setGameOver = (gameOver) => ({
    type: GAME_ACTION_TYPES.SET_GAME_OVER,
    payload: gameOver,
});

export const setHasWon = (hasWon) => ({
    type: GAME_ACTION_TYPES.SET_HAS_WON,
    payload: hasWon,
});

export const setSolution = (solution) => ({
    type: GAME_ACTION_TYPES.SET_SOLUTION,
    payload: solution,
});

export const setNewSolution = () => {
    return async (dispatch) => {
        const { options } = store.getState();
        const { wordLength } = options;
        const newWord = await getRandomWordofLength(wordLength);
        dispatch(setSolution(newWord));
    };
};

export const setRows = (rows) => ({
    type: GAME_ACTION_TYPES.SET_ROWS,
    payload: rows,
});

export const setKeyColors = (keyColors) => ({
    type: GAME_ACTION_TYPES.SET_KEY_COLORS,
    payload: keyColors,
});

export const setActiveRow = (activeRow) => ({
    type: GAME_ACTION_TYPES.SET_ACTIVE_ROW,
    payload: activeRow,
});

export const resetBoard = () => {
    const { options } = store.getState();
    const { wordLength, numGuesses } = options;
    const blankBoard = generateBlankGrid(wordLength, numGuesses);
    return {
        type: GAME_ACTION_TYPES.RESET_BOARD,
        payload: blankBoard,
    };
};

export const incrementTimer = (newTime) => ({
    type: GAME_ACTION_TYPES.INCREMENT_TIMER,
    payload: newTime,
});

export const pauseTimer = () => {
    return {
        type: GAME_ACTION_TYPES.PAUSE_TIMER,
    };
};

export const resumeTimer = () => {
    return {
        type: GAME_ACTION_TYPES.RESUME_TIMER,
    };
};

export const resetTimer = () => {
    return (dispatch) => {
        dispatch(incrementTimer(0));
    };
};

export const setChallengeID = (challengeID) => ({
    type: GAME_ACTION_TYPES.SET_CHALLENGE_ID,
    payload: challengeID,
});
