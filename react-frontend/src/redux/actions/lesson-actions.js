import React from 'react';

export const FETCH_ALL_LESSONS = "FETCH_ALL_LESSONS";
export const FETCH_USER_LESSONS = "FETCH_USER_LESSONS";
export const ADD_LESSON = "ADD_LESSON";
export const SET_NEW_LESSON = "SET_NEW_LESSON";


export const setUserLessons = (ids) => ({
    type: FETCH_USER_LESSONS,
    payload: ids
})


export const addLesson = () => ({
    type: ADD_LESSON,
})

export const setLessons = (lessons) => ({
    type: FETCH_ALL_LESSONS,
    payload: lessons
})


export const setLessonInfo = (lesson) => ({
    type: SET_NEW_LESSON,
    payload: lesson
})
