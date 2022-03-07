import React, {useState} from "react";
import axios from "axios";

const ResourcesForm = () => {

    const [fileName, setFileName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleFile = (e) => {
        e.preventDefault();
        setFileName(e.target.files[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', fileName);
        const response = await axios.post("http://localhost:8200/resources/add", formData);
        const data = await response.data;

        let resourceID = data.id;

        console.log(resourceID)
    }

    return (
        <>
            <div className="form-group">
                <label>Upload Your File </label>
                <input type="file" className="form-control" name="file" onChange={handleFile}/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default ResourcesForm;