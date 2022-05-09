import React, {useState} from "react";
import {useDispatch} from "../../react-redux-hooks";
import {Link} from "react-router-dom";
import {createLesson} from "../../redux/thunks/lesson-thunks";


const AddLesson = () => {
    const initialState = {
        id: null,
        title: '',
        description: '',
        resourcesIds: []

    }

    const dispatch = useDispatch();

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
        <div className="container mt-5">
            {submitted ? (<div>
                        <h4>You submitted successfully! </h4>
                        <Link to={`/lessonDetailsTitle/${lesson.title}`}> Add resource to lesson!</Link>
                    </div>
                ) :
                <>
                    <form onSubmit={submitLesson}>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Title: </label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={lesson.title}
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
                                    className="form-control"
                                    id="description"
                                    required
                                    value={lesson.description}
                                    onChange={handleInputChange}
                                    name="description"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <button type="submit" className="btn btn-dark mx-3">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            }
        </div>
    )
}

export default AddLesson;