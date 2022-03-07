import React from 'react';
import {useState} from "react";
import TestComponentSecond from "./TestComponentSecond";


const TestComponent = () => {
    const [submitted, setSubmitted] = useState(false)
    const [text, setTest] = useState('')

    const handleSubmit = (e) =>{
       e.preventDefault();
       setSubmitted(!submitted)
    }


    return (
        <>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                name="name"
            />
            <button onClick={handleSubmit} className="btn btn-success"> Submit
            </button>
        </div>
            {submitted &&  <TestComponentSecond/>}
        </>
    )
}


export default TestComponent;