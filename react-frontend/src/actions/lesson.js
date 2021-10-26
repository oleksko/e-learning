

export const FETCH_ALL_LESSONS = "FETCH_ALL_LESSONS";
export const FETCH_USER_LESSONS = "FETCH_USER_LESSONS";


export  const setUserLessons = (ids) => ({
    type: FETCH_USER_LESSONS,
    payload: ids
})

export const setLessons = () => ({
    type: FETCH_ALL_LESSONS
})


export const fetchUserLessons = (ids) => async (dispatch) => {
    try{

    } catch (error){
        console.log(error)
    }
}