import React from 'react';
import {useSelector} from "../react-redux-hooks";
import Resource from "../components/Resources/ResourceList";
import ResourceList from "../components/Resources/ResourceList";
import ResourceAddToLesson from "./ResourceAddToLesson";
import {Link} from "react-router-dom";


const LessonDetailsAdmin = ({match}) => {

    const  {id} = match.params


    const lesson = useSelector(state =>
        state.lesson.lessons.find(lesson => lesson.id === id)
    )

    if (!lesson) {
        return (
            <section>
                <h2>Lesson not found ID!</h2>
            </section>
        )
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <h2>Title: {lesson.title}</h2>
                    <h3>Description: {lesson.description}</h3>
                </div>
            </div>
            <ResourceList resourcesIds={lesson.resourcesIds}/>
        </div>
    )
}

export default LessonDetailsAdmin