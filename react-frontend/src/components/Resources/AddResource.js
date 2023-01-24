import React, {useState} from 'react';
import {useDispatch, useSelector} from "../../react-redux-hooks";
import {addResourceToLesson} from "../../redux/thunks/lesson-thunks";
import {useHistory} from "react-router-dom";

const AddResource = ({match}) => {

    console.log('addresource component !!!!')


    const {title} = match.params
    const lesson = useSelector(state =>
        state.lesson.lessons.find(lesson => lesson.title === title)
    )

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
        dispatch(addResourceToLesson(formData, lesson.id))
        setSubmitted(true);
        history.push("/lessons");
    }

    return (
        <div className="container mt-5">
            <h1>{title}</h1>
            <h2>Title: {lesson.title}</h2>
            <h3>Description: {lesson.description}</h3>
            <>
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
                            <button>
                                Submit
                            </button>
                        </form>
                    </div>
                }
            </>
        </div>
    )
}


export default AddResource;