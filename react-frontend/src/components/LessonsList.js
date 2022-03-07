import React from 'react';
import {Link} from "react-router-dom";


const LessonsList = (props) => {
    return (
        <>
            <Link to={`/lessonDetails/${props.lesson.id}`}> Lesson :{props.lesson.title} </Link>
            <br/>
        </>
    )
}

export default LessonsList