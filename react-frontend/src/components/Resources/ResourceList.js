import React, {useState} from "react";
import axios from "axios";
import Resource from "./Resource";


const ResourceList = (props) => {

    let [resource, setResource] = useState([]);
    let [change, setChange] = useState(true);

    //TODO EXTRACT DO
    React.useEffect(() => {
        let resourcesId = props.resourcesIds.join(",")
        if (change) {
            axios.get(`http://localhost:8080/resources/ids/${resourcesId}`).then(r => setResource(r.data))
            setChange(false)
        }
    }, [change]);

    return (
        <>
            <h5>Resources:</h5>
            {resource.map(r => <Resource name={r.name} url={r.url}/>)}
        </>
    )

}

export default ResourceList;




