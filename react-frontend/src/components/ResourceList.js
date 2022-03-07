import React, {useState} from "react";
import {fetchLessons} from "../actions/lesson";
import axios from "axios";
import Resource from "./Resource";


const ResourceList = (test) => {

    let [resource, setResource] = useState([]);
    let [change, setChange] = useState(true);

    const fetchResources = async () => {
        const response = await axios.get("http://localhost:8200/resources/ids/1res,2res");
        const data = await response.data;
        console.log('---------- FETCH DATA ---------------')
        console.log(data)
        console.log('---------- FETCH DATA ---------------')
        setResource(data)
    }

    React.useEffect( () => {
        if (change) {
            axios.get('http://localhost:8200/resources/ids/1res,2res').then(r => setResource(r.data))
            setChange(false)
        }
        // const fetchData = async () => {
        //     const result = await axios(
        //         'http://localhost:8200/resources/ids/1res,2res',
        //     );
        //
        //     setResource(result.data);
        //
        //
        // };

        // fetchData().then(r => console.log(r));
    }, [change]);

    return (
        <>
            {resource.map(r => <Resource name={r.name} url={r.url}/>)}
        </>
    )

}

export default ResourceList;