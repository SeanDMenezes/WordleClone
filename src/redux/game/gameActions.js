import { getRandomWordofLength } from "../../../pages/api/wordAPI";
import { GAME_ACTION_TYPES } from "./gameTypes";

import { store } from "../store";

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
