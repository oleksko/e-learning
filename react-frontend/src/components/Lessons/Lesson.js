import React from 'react';
import Resource from "../Resources/ResourceList";
import {Link, useHistory} from "react-router-dom";
import {createBrowserHistory as browserHistory} from "history";

const Lesson = (props) => {

    const history = useHistory();

    return (
        <>
            <p>Lesson :{props.lesson.title}</p>
            <p>Lesson description :{props.lesson.description}</p>
            <Link to={`/lessonDetails/${props.lesson.id}`}> DETAILS </Link>
        </>
    )
}

export default Lesson;