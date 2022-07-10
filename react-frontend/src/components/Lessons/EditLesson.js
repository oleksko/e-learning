import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useSelector} from "../../react-redux-hooks";
import {updateUser} from "../../redux/thunks/user-thunks";
import {useHistory} from "react-router-dom";
import {updateLesson} from "../../redux/thunks/lesson-thunks";


const EditLesson = ({match}) => {

    // const userDetails = useSelector((state) => state.user.userData)
    const {id} =  match.params
    const history = useHistory();

    const lessonDetails = useSelector(state =>
        state.lesson.lessons.find(lesson => lesson.id === id)
    )

    const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();
        const lessonEdited = {title, description};
        dispatch(updateLesson(id, title, description));
        history.push("/lessons");
    }

    const [lesson, setLesson] = useState(lessonDetails);
    const {title,description} = lesson;


    const handleInputChange = event => {
        const {name, value} = event.target;
        setLesson({...lesson, [name]: value});
    }

    return (
        <div className="container mt-5">
            <form onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Title: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="title"
                            required
                            value={title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Description: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="description"
                            required
                            value={description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                </div>
                {/*TODO DODANIE FRAGMENTU CO DODA RESOURCE!!*/}
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}


export default EditLesson;