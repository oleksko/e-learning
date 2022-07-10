import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addResourceToLesson} from "../redux/thunks/lesson-thunks";
import {useHistory} from "react-router-dom";

const ResourceAdd = ({match}, lesson) => {

    const  {id} = match.params

    const [fileName, setFileName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFile = (e) => {
        e.preventDefault();
        setFileName(e.target.files[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', fileName);
        dispatch(addResourceToLesson(formData, id))
        setSubmitted(true);
        history.push("/lessons");
    }

    return (
        <>
            <h2>Title: {lesson.title}</h2>
            <h3>Description: {lesson.description}</h3>
            {submitted ? (<div className="container mt-5">
                        <h4>You submitted successfully! </h4>
                    </div>
                ) :
                <div className="container mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Upload File: </label>
                            <div className="col-sm-4">
                                <input type="file" className="form-control" name="file" onChange={handleFile}/>
                            </div>
                        </div>
                        <button >
                            Submit
                        </button>
                    </form>
                </div>
            }
        </>
    )
}

export default ResourceAdd;