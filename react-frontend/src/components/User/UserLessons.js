import React from "react";
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {fetchUserLessons} from "../../redux/actions/user-actions";
import Lesson from "../Lessons/Lesson";
import {Link} from "react-router-dom";

const UserLessons = () => {
    const lessons = useSelector((state) => state.lesson.userLessons)
    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     if (lessonsIds) {
    //         let str = lessonsIds.join(',')
    //         dispatch(fetchUserLessons(str));
    //     }
    // }, [user.name, dispatch]);

    return (
        <div className="container">
            <>
                <table className="table mt-4 border text-center">
                    <thead className="table-active">
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {lessons.map((lesson) => {
                        return (
                            <tr key={lesson.id}>
                                <th>{lesson.id}</th>
                                <th>{lesson.title}</th>
                                <th>{lesson.description}</th>
                                <th>
                                    <Link to={`/lessonDetails/${lesson.id}`}>Details</Link>
                                </th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </>
        </div>
    );


}


export default UserLessons;
