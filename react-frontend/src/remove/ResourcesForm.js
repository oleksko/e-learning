import React, {useState} from "react";
import axios from "axios";

const ResourcesForm = () => {

    console.log('ResourcesForm')
    const [fileName, setFileName] = useState('');

    const handleFile = (e) => {
        e.preventDefault();
        setFileName(e.target.files[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', fileName);
        const response = await axios.post("http://localhost:8200/resources/add", formData);
        const data = await response.data;
    }

    return (
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
    )
}

export default ResourcesForm;