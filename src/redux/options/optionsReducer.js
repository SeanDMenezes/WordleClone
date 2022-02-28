import { OPTION_ACTION_TYPES } from "./optionsTypes";

const INITIAL_STATE = {
    wordLength: 5,
    numGuesses: 6,
    isHardMode: false,
    isTimeTrial: false,
    timeNumWords: 2,
};

const optionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPTION_ACTION_TYPES.SET_WORD_LENGTH:
            return {
                ...state,
                wordLength: action.payload,
            };
        case OPTION_ACTION_TYPES.SET_NUM_GUESSES:
            return {
                ...state,
                numGuesses: action.payload,
            };
        case OPTION_ACTION_TYPES.SET_HARD_MODE:
            return {
                ...state,
                isHardMode: action.payload,
            };
        case OPTION_ACTION_TYPES.SET_TIME_TRIAL:
            return {
                ...state,
                isTimeTrial: action.payload,
            };
        case OPTION_ACTION_TYPES.SET_TIME_NUM_WORDS:
            return {
                ...state,
                timeNumWords: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default optionsReducer;
