import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; // helps with debugging.
import thunk from "redux-thunk";
import { persistStore } from "redux-persist"; // cache our store in the browser

import rootReducer from "./rootReducer.js";

const middlewares = [thunk, logger]; // middlewares  are passed in as an array. If you want to pass in more middlewares, just add it to the array.

middlewares.push(logger);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);