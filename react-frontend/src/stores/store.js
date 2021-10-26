// import combineReducers from 'react-combine-reducers';
// import React, {createContext, useMemo, useReducer} from "react";
// import {userReducer} from './user/UserStore';
// // import {lessonReducer, lessonState} from "./lesson/LessonStore";
//
//
// const [globalReducer, initialState] = combineReducers({
//     user: userReducer,
//     // lesson: [lessonReducer, lessonState]
// });
//
// const GlobalContext = createContext(initialState);
// const { Provider } = GlobalContext;
//
// const StateProvider = ( { children } ) => {
//     const [state, dispatch] = useReducer(globalReducer, initialState);
//     const contextValue = useMemo(() => {
//         return {
//             state,
//             dispatch
//         };
//     }, [state, dispatch]);
//     return <Provider value={contextValue}>{children}</Provider>;
// };
//
// export { GlobalContext, StateProvider };
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, logger];


const store =  createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares, routerMiddleware(history)))
);

export default store;