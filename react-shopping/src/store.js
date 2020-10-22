import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {} from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { logger } from "redux-logger";

const initialState = {};
const middlewares = [thunk, logger];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);
// composeEnhancer(applyMiddleware(thunk)
//  applyMiddleware(...middlewares)
//  composeEnhancer(applyMiddleware(...middlewares))

export default store;
