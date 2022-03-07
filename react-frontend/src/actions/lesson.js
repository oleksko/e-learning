import async from "async";
import axios from "axios";
import React from 'react';
import {push} from "connected-react-router";

export const FETCH_ALL_LESSONS = "FETCH_ALL_LESSONS";
export const FETCH_USER_LESSONS = "FETCH_USER_LESSONS";
export const FETCH_USER_LESSONS_DETAILS = "FETCH_USER_LESSONS_DETAILS";
export const ADD_LESSON = "ADD_LESSON";
export const SET_NEW_LESSON = "SET_NEW_LESSON";


export  const setUserLessons = (ids) => ({
    type: FETCH_USER_LESSONS,
    payload: ids
})

export const addLesson = (lesson) => ({
    type: ADD_LESSON,
    payload: lesson
})

export const setLessons = (lessons) => ({
    type: FETCH_ALL_LESSONS,
    payload: lessons
})


export const setLessonInfo = (lesson) => ({
    type: SET_NEW_LESSON,
    payload: lesson
})

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


export const fetchUserLessons = (ids) => async (dispatch) => {

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
        console.log(data)

        return [
            dispatch(setLessons(data))
        ]
    } catch (error) {
        console.log(error)
    }
}


