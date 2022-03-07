import React from 'react';
import {useSelector} from "../react-redux-hooks";
import Resource from "./ResourceList";
import ResourceList from "./ResourceList";


const LessonDetails = ({match}) => {

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
        <section>
            <article className="post">
                <h2>{lesson.title}</h2>
                <p className="post-content">{lesson.description}</p>
                <p>
                    {lesson.resourcesIds}
                </p>
            </article>
            <ResourceList/>
        </section>
    )
}

export default LessonDetails