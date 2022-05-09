import React from 'react';
import {useDispatch, useSelector} from "../../react-redux-hooks";
import ResourceAddToLesson from "../Resources/ResourceAddToLesson";
import {fetchLessonInfo} from "../../redux/thunks/lesson-thunks";

const LessonDetailsTitle = ({match}) => {

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
            <div className="row">
                <div className="col-md-7">
                    <h2>Title: {lesson.title}</h2>
                    <h3>Description: {lesson.description}</h3>
                </div>
            </div>
            <ResourceAddToLesson lessonId={lesson.id}/>
        </div>
    )
}


export default LessonDetailsTitle;