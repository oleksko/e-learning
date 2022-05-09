import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addResourceToLesson} from "../../redux/thunks/lesson-thunks";

const ResourceAddToLesson = (props) => {

    const [fileName, setFileName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    const handleFile = (e) => {
        e.preventDefault();
        setFileName(e.target.files[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', fileName);
        dispatch(addResourceToLesson(formData, props.lessonId))
        setSubmitted(true);
    }

    return (
        <div className="container mt-5">
            {submitted ? (<div>
                        <h4>You submitted successfully! </h4>
                    </div>
                ) :
                <form onSubmit={handleSubmit}>
                    <div className="form row mt-3">
                        <label className="col-sm-2 col-form-label">Upload Your File: </label>
                        <br/>
                        <div className="col">
                            <input type="file"
                                   name="file"
                                   onChange={handleFile}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark mt-3">
                      Add
                    </button>
                </form>
            }
        </div>
    )
}

export default ResourceAddToLesson;