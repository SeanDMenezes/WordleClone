import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // where we want to store our reducer

// reducers
import gameReducer from "./game/gameReducer";
import optionsReducer from "./options/optionsReducer";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    options: optionsReducer,
    gameState: gameReducer,
});

export default persistReducer(persistConfig, rootReducer);
