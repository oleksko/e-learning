import React, {useState} from 'react';
import {useDispatch, useSelector} from "../react-redux-hooks";
import {fetchLessons} from "../actions/lesson";
import Lesson from "./Lesson";
import LessonsList from "./LessonsList";


const Lessons = () => {

    const lessons = useSelector((state) => state.lesson.lessons);
    const dispatch = useDispatch();


    React.useEffect(() => {
      dispatch(fetchLessons());
    }, [dispatch]);

    return (
        <>
            {/*{lessons.map(lesson => <Lesson key={lesson.id} test={lesson.resourcesIds[0]} title={lesson.title} description={lesson.description}/>)}*/}
            {/*{lessons.map(lesson => <Lesson lesson={lesson}/>)}*/}
            {lessons.map(lesson => <LessonsList lesson={lesson}/>)}
            {/*<Lesson key={lessons[0].id} test={lessons[0].resourcesIds[0]} title={lessons[0].title} description={lessons[0].description}/>*/}
        </>

    )
}


export default Lessons;