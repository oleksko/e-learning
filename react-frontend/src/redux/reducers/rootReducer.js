import { combineReducers } from "redux";
import userReducers from "./user-reducers";
import { connectRouter } from "connected-react-router";
import LessonReducers from "./lesson-reducers";

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducers,
        lesson: LessonReducers,
        // resource: ResourceReducer
    });


export default rootReducer;