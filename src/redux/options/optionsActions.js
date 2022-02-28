import { getRandomWordofLength } from "../../../pages/api/wordAPI";
import {
    pauseTimer,
    resetTimer,
    resumeTimer,
    setSolution,
} from "../game/gameActions";
import { OPTION_ACTION_TYPES } from "./optionsTypes";

export const setWordLength = (wordLength) => ({
    type: OPTION_ACTION_TYPES.SET_WORD_LENGTH,
    payload: wordLength,
});

export const updateWordLength = (newWordLength) => {
    return async (dispatch) => {
        const wordLength = parseInt(newWordLength);
        const newWord = await getRandomWordofLength(wordLength);
        dispatch(setNumGuesses(wordLength + 1));
        dispatch(setSolution(newWord));
        dispatch(setWordLength(wordLength));
    };
};

export const setNumGuesses = (numGuesses) => ({
    type: OPTION_ACTION_TYPES.SET_NUM_GUESSES,
    payload: numGuesses,
});

export const setHardMode = (isHardMode) => ({
    type: OPTION_ACTION_TYPES.SET_HARD_MODE,
    payload: isHardMode,
});

export const updateTimeTrial = (isTimeTrial) => ({
    type: OPTION_ACTION_TYPES.SET_TIME_TRIAL,
    payload: isTimeTrial,
});

export const setTimeTrial = (isTimeTrial) => {
    return (dispatch) => {
        if (isTimeTrial) {
            dispatch(resumeTimer());
        } else {
            dispatch(pauseTimer());
        }
        dispatch(resetTimer());
        dispatch(updateTimeTrial(isTimeTrial));
    };
};

export const setTimeNumWords = (numWords) => ({
    type: OPTION_ACTION_TYPES.SET_TIME_NUM_WORDS,
    payload: numWords,
});
