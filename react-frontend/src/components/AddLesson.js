import {useState} from "react";
import React from 'react';
import {useDispatch} from "../react-redux-hooks";
import {addLesson, createLesson} from "../actions/lesson";
import {Link, useHistory} from "react-router-dom";


const AddLesson = () => {
    const initialState = {
        id: null,
        title: '',
        description: '',
        resourcesIds: []

    }

    const dispatch = useDispatch();
    const history = useHistory();

    const [lesson, setLesson] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setLesson({...lesson, [name]: value});
    };

    const submitLesson = () => {
        const {title, description, resourcesIds} = lesson;
        dispatch(createLesson(title, description, resourcesIds)).then(data => console.log(data));
        setSubmitted(true);
    }


    return (
        <div className="submit-form">
            {submitted ? (<div>
                <h4>You submitted successfully! </h4>
                <Link to={`/lessonDetailsTitle/${lesson.title}`}> DETAILS </Link>
            </div>) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={lesson.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={lesson.description}
                                onChange={handleInputChange}
                                name="description"
                            />
                        </div>
                        <button onClick={submitLesson} className="btn btn-success"> Submit
                        </button>
                     {/*#TODO add lesson with resources (add also on the backend side)*/}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddLesson;