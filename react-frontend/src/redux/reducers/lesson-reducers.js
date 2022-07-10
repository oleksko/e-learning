import * as LessonActions from "../actions/lesson-actions";


const initialState = {
    newLesson: {},
    lessons: [],
    userLessons: [],
    lessonTitle: {}
}


const LessonReducers = (state = initialState, action) => {
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
        //    TODO USUWA WCZESNIEJSZE LEKCJE
        case LessonActions.ADD_LESSON:
            return {
                ...state,
                newLesson: action.payload
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

export default LessonReducers;