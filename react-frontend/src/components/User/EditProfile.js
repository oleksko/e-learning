import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useSelector} from "../../react-redux-hooks";


// TODO COMPONENT FOR EDIT YOUR PROFILE
const EditProfile = () => {

    const userDetails = useSelector((state) => state.user.userData)

    const dispatch = useDispatch();
    const onFormSubmit = () => {
        console.log('submit')
    }

    const [user, setUser] = useState(userDetails);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    return (
        <>
            <form className="edit_personal_data" onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="name"
                            required
                            value={user.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Surname: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="email"
                            required
                            value={user.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email: </label>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Login: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="login"
                            required
                            value={user.login}
                            onChange={handleInputChange}
                            name="login"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="password"
                            required
                            value={user.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Confirmation Password: </label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            id="passwordConfirmation"
                            required
                            value={user.passwordConfirmation}
                            onChange={handleInputChange}
                            name="passwordConfirmation"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Role: </label>
                    <div className="col-sm-4">
                        <select value={user.role} onChange={handleInputChange} name="role" id="role">
                            <option value="default" disabled>Choose an option</option>
                            <option value="ROLE_STUDENT">STUDENT</option>
                            <option value="ROLE_TEACHER">TEACHER</option>
                            <option value="ROLE_ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}


export default EditProfile;