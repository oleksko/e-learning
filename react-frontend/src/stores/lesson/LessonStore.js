

const initialState = {
    lessons: [],
    userLessons: [],
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
        default:
            return state
    }
}

export default LessonReducer;