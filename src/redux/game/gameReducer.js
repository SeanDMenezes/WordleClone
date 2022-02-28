import { generateBlankGrid } from "../../helpers/boardHelper";
import { GAME_ACTION_TYPES } from "./gameTypes";

const INITIAL_STATE = {
    loading: false,
    gameOver: false,
    hasWon: false,
    solution: "",
    rows: generateBlankGrid(5, 6),
    keyColors: {},
    activeRow: 0,
    timer: 0,
    timerPaused: true,
    challengeID: null,
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
            return {
                ...state,
                solution: action.payload,
            };
        case GAME_ACTION_TYPES.SET_ROWS:
            return {
                ...state,
                rows: action.payload,
            };
        case GAME_ACTION_TYPES.SET_KEY_COLORS:
            return {
                ...state,
                keyColors: action.payload,
            };
        case GAME_ACTION_TYPES.SET_ACTIVE_ROW:
            return {
                ...state,
                activeRow: action.payload,
            };
        case GAME_ACTION_TYPES.RESET_BOARD:
            return {
                ...state,
                rows: action.payload,
                keyColors: {},
                activeRow: 0,
                timer: 0
            }
        case GAME_ACTION_TYPES.RESET_TIMER:
            return {
                ...state,
                timer: 0,
            }
        case GAME_ACTION_TYPES.INCREMENT_TIMER:
            return {
                ...state,
                timer: state.timerPaused ? state.timer : action.payload
            }
        case GAME_ACTION_TYPES.PAUSE_TIMER:
            return {
                ...state,
                timerPaused: true
            }
        case GAME_ACTION_TYPES.RESUME_TIMER:
            return {
                ...state,
                timerPaused: false
            }
        case GAME_ACTION_TYPES.SET_CHALLENGE_ID:
            return {
                ...state,
                challengeID: action.payload
            }
        default:
            return {
                ...state,
            };
    }
};

export default gameReducer;
