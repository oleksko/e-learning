import React from 'react';
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {Link} from "react-router-dom";
import {fetchLessons} from "../../redux/thunks/lesson-thunks";
import {Button} from "react-bootstrap";
import {addLessonToUser} from "../../redux/thunks/user-thunks";


const Lessons = () => {

    const lessons = useSelector((state) => state.lesson.lessons);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData)


    React.useEffect(() => {
        dispatch(fetchLessons());
    }, []);


    const handleRemoveLesson = (lessonId) => {
        console.log('remove lesson with id: ' + lessonId)
    }

    //TODO PRZELADOWANIE PO DODANIU LEKCJI DO UZYTOWNIKA
    const handleSubscribe = (lessonId) => {
        dispatch(addLessonToUser(user, lessonId));
    }


    const buttonPanel = (user, lesson) => {
        console.log('buttonpanel')
        console.log(user)
        console.log('buttonpanel')
        if (user.role === 'ROLE_STUDENT')
            if (user.lessonsIds !== undefined) {
                return (
                    <>
                        {console.log('sa')}
                        {user.lessonsIds.includes(lesson.id) ?
                            <th><p className="btn btn-dark mx-3">Subscribed</p></th> :
                            <th>
                                <Button onClick={() => handleSubscribe(lesson.id)}
                                        className="btn btn-success mx-3">
                                    Subscribe
                                </Button>
                            </th>
                        }
                    </>
                )
            } else {
                return (

                    <>
                        {console.log('undf')}
                        <th>
                            <Button onClick={() => handleSubscribe(lesson.id)}
                                    className="btn btn-success mx-3">
                                Subscribe
                            </Button>
                        </th>
                    </>
                )

            }
        else if (user.role === 'ROLE_ADMIN')
            return (
                <>
                    <th>
                        <Link to={`/LessonDetails/${lesson.id}`} className="btn btn-success mx-3"> Details </Link>
                        <Button onClick={() => handleRemoveLesson(lesson.id)}
                                className="btn btn-success mx-3">
                            Remove
                        </Button>
                    </th>
                </>
            )
        else if (user.role === 'ROLE_TEACHER')
            return (
                <>
                    <th>
                        <Link to={`/lessonDetails/${lesson.id}`} className="btn btn-success mx-3"> Details </Link>
                    </th>
                </>
            )
    }

    return (
        <div className="container">
            <>
                <table className="table mt-4 border text-center">
                    <thead className="table-active">
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Description</th>
                        {Object.keys(user).length !== 0 ? <th></th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {lessons.map(lesson => {
                        return (
                            <tr key={lesson.id}>
                                <th>{lesson.id}</th>
                                <th>{lesson.title}</th>
                                <th>{lesson.description}</th>
                                {Object.keys(user).length !== 0 ?
                                    buttonPanel(user, lesson) : null
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
        </div>

    )
}


export default Lessons;