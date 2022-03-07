import * as LessonActions from "../../actions/lesson";


const initialState = {
    lessons: [],
    userLessons: [],
    lessonTitle: {}
}


const LessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case LessonActions.FETCH_ALL_LESSONS:
            return {
                ...state,
                lessons: action.payload
            }
        case LessonActions.FETCH_USER_LESSONS:
            return {
                ...state,
                userLessons: action.payload
            }
        case LessonActions.ADD_LESSON:
            return {
                ...state,
                lessons: action.payload
            }
        case LessonActions.SET_NEW_LESSON:
            return {
                ...state,
                lessonTitle: action.payload
            }
        default:
            return state
    }
}

export default LessonReducer;