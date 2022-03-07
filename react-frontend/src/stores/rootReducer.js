import { combineReducers } from "redux";
import userReducer from "./user/UserStore";
import { connectRouter } from "connected-react-router";
import LessonReducer from "./lesson/LessonStore";

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        lesson: LessonReducer,
        // resource: ResourceReducer
    });


export default rootReducer;