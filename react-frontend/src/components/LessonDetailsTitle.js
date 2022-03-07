import React from 'react';
import {useDispatch, useSelector} from "../react-redux-hooks";
import ResourceList from "./ResourceList";
import {fetchLessonInfo} from "../actions/lesson";

const LessonDetailsTitle = ({match}) => {

    const {title} = match.params
    const lesson = useSelector(state =>
        state.lesson.lessonTitle
    )
    const dispatch = useDispatch();

    React.useEffect(() => {
            console.log('useeffct')
            console.log(title)
            dispatch(fetchLessonInfo(title));
    }, []);

    // const lesson = useSelector(state => state.lesson.lessons)


    return (
        <>
            {lesson && Object.keys(lesson) ?
                <section>
                    {console.log('test' + lesson)}
                    <article className="post">
                        <h2>{lesson.title}</h2>
                        <p className="post-content">{lesson.description}</p>
                        <p>
                            {lesson.resourcesIds}
                        </p>
                    </article>
                    <ResourceList/>
                </section>
                : <p>Nothing</p>
            }
        </>
    )
}


export default LessonDetailsTitle;