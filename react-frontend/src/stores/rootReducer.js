import { combineReducers } from "redux";
import userReducer from "./user/UserStore";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
    });


export default rootReducer;