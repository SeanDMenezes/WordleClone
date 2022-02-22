import { GAME_ACTION_TYPES } from "./gameTypes";

const INITIAL_STATE = {
    loading: false,
    gameOver: false,
    hasWon: false,
    solution: "",
};

const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GAME_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case GAME_ACTION_TYPES.SET_GAME_OVER:
            return {
                ...state,
                gameOver: action.payload,
            };
        case GAME_ACTION_TYPES.SET_HAS_WON:
            return {
                ...state,
                hasWon: action.payload,
            };
        case GAME_ACTION_TYPES.SET_SOLUTION:
            console.log("HERE", action.payload);
            return {
                ...state,
                solution: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default gameReducer;
