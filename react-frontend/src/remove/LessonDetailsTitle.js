import React from 'react';
import {useDispatch, useSelector} from "../react-redux-hooks";
import ResourceAddToLesson from "./ResourceAddToLesson";
import {fetchLessonInfo} from "../redux/thunks/lesson-thunks";
import {useLocation} from "react-router-dom";

const LessonDetailsTitle = ({match}) => {

    const location = useLocation();
    const data = location.state;
    console.log('---------')
    console.log(data)
    console.log('---------')

    const {title} = match.params
    const lesson = useSelector(state =>
        state.lesson.lessonTitle
    )
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchLessonInfo(title));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Title: {lesson.title}</h2>
            <h3>Description: {lesson.description}</h3>
        </div>
    )
}


export default LessonDetailsTitle;