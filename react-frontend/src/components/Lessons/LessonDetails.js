import React from 'react';
import {useSelector} from "../../react-redux-hooks";
import ResourceList from "../Resources/ResourceList";
import {Link} from "react-router-dom";
import lessons from "./Lessons";


const LessonDetails = ({match}) => {

    const {id} = match.params

    const user = useSelector((state) => state.user.userData)

    const lesson = useSelector(state => {
            console.log('state.lesson')
            console.log(state.lesson.lessons)
            console.log(id)
            console.log(state.lesson.lessons.find(lesson => lesson.id === id));
            return state.lesson.lessons.find(lesson => lesson.id === id)

        }

    )
    console.log('lesson-----')
    console.log(lesson)
    console.log('lesson-----')
    let links;
    if (Object.keys(user).length === 0) {
        links = null
    } else if (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_TEACHER') {
        links = (
            <>
                <Link to={`/editLesson/${lesson.id}`} className="btn btn-success mx-3"> Edit </Link>
                <Link to={`/addResource/${lesson.title}`} className="btn btn-success mx-3"> Add resource </Link>
            </>
        )
    }

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
                <div className="col-md-12">
                    <h2>Title: {lesson.title}</h2>
                    <h4>Description: {lesson.description}</h4>
                </div>
            </div>
            <ResourceList resourcesIds={lesson.resourcesIds}/>
            {links}
        </div>
    )
}

export default LessonDetails