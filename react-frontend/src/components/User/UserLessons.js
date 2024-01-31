import React from "react";
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {Link} from "react-router-dom";

const UserLessons = () => {
    const lessons = useSelector((state) => state.lesson.userLessons)

    return (
        <div className="container">
            <>
                <table className="table mt-4 border text-center">
                    <thead className="table-active">
                    <tr>
                        {/*<th>id</th>*/}
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {lessons.map((lesson) => {
                        return (
                            <tr key={lesson.id}>
                                {/*<th>{lesson.id}</th>*/}
                                <th>{lesson.title}</th>
                                <th>{lesson.description}</th>
                                <th>
                                    <Link to={`/lessonDetails/${lesson.id}`} className="btn btn-success mx-3">Details</Link>
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
