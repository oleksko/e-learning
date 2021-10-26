import React, {useEffect, useState} from "react";
import axios from "axios";


const fetchUsers = () => {
    return axios.get(`http://localhost:8090/user/all`).then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    })
}

let imgs = [
    'https://oleksiak-bucket.s3.eu-central-1.amazonaws.com/files/2a319417e9564105aa9664b342bf31e4test.jpg',
    'https://oleksiak-bucket.s3.eu-central-1.amazonaws.com/files/2950082a749b4866800801976d98c6a6test.jpg',
];


const UsersComponent = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers().then((randomData) => {
            setUsers(users => [...users, randomData.data])
        })
    }, [])

    const refresh = () =>{
        fetchUsers().then((randomData) => {
            setUsers(users => [...users, randomData.data])
        })
    }

    return (
        <div>
            <div>
                <img src={imgs[0]}/>
                <img src={imgs[1]}/>
            </div>
            {
                users.map((User, index) => {
                    return (
                        <p key={`${User[index].firstName}`}>
                            {User[index].firstName}  -  {User[index].lastName}
                        </p>
                    );
                })
            }
            <button onClick={null}>Refresh</button>
            <div>Hello</div>
        </div>
    );
}

export default UsersComponent;

