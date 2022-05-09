import axios from "axios";
import {addLesson, setLessonInfo, setLessons, setUserLessons} from "../actions/lesson-actions";

export const createLesson = (title, description, resourcesIds) =>  async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/lessons/create', {title, description, resourcesIds} )
        const data = await response.data
        return [
            dispatch(addLesson(data)),
            dispatch(setLessons(data))
        ]
    } catch (error) {
        console.log(error)
    }
}


export const fetchUserLessons = (lessonsIds) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/lessons/ids/${lessonsIds}`);
        const data = await response.data;
        console.log('--------FETCH LESSONS DATA')
        console.log(data);
        console.log('--------FETCH LESSONS DATA')
        dispatch(setUserLessons(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchLessonInfo = (title) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/lessons/title/${title}`);
        const data = await response.data;
        console.log(data)

        return [
            dispatch(setLessonInfo(data))
        ]
    } catch (error) {
        console.log(error)
    }
}



export const fetchLessons = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8080/lessons");
        const data = await response.data;
        return [
            dispatch(setLessons(data))
        ]
    } catch (error) {
        console.log(error)
    }
}


export const addResourceToLesson = (file, lessonId) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:8200/resources/add/${lessonId}`, file);
        const data = await response.data;
        return [
            dispatch(setLessons(data))
        ]
    } catch (error) {
        console.log(error)
    }
}
