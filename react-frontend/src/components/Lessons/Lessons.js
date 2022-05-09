import React from 'react';
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {Link} from "react-router-dom";
import {fetchLessons} from "../../redux/thunks/lesson-thunks";
import {Button} from "react-bootstrap";


const Lessons = () => {

    const lessons = useSelector((state) => state.lesson.lessons);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData)


    React.useEffect(() => {
        dispatch(fetchLessons());
    }, [dispatch]);


    //TODO ADD LESSON TO USER DISPATCH INFOS
    const handleClick = (lessonId) => {
        console.log('=============')
        console.log(lessonId)
        console.log('=============')
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
                                    <th>
                                        <Button onClick={() => handleClick(lesson.id)} className="btn btn-dark mx-3">
                                            Save
                                        </Button>
                                    </th>
                                    : null}
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