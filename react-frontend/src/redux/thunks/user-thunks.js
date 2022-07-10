import axios from "axios";
import jwt from "jwt-decode";
import {setUserLessons} from "../actions/lesson-actions";
import {
    getAllUsers,
    loginUser, logoutSuccess,
    removeUserData,
    setToken,
    setUserInfos,
    userLoading,
    userLoadingEnd
} from "../actions/user-actions";

export const fetchLoginUser = (user) => async (dispatch) => {
    dispatch(userLoading());
    try {
        const response = await axios.post("http://localhost:8080/login", user);
        const data = await response.data;
        const decodedToken = jwt(data.accessToken);
        console.log('decoded token')
        console.log(decodedToken)
        console.log('decoded token')
        return [
            dispatch(loginUser(decodedToken)),
            dispatch(userLoadingEnd()),
            dispatch(setToken(data.accessToken)),
            dispatch(fetchUserLessons(decodedToken.lessonsIds)),
            localStorage.setItem("token", JSON.stringify(data.accessToken)),
            localStorage.setItem("user", JSON.stringify(data)),
        ]
    } catch (error) {
        return [
            dispatch(userLoadingEnd()),
            console.log(error)
        ]
    }
}

export const addUser = (name, surname, email, login, password, passwordConfirmation, role) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8100/users/register', {
            name,
            surname,
            email,
            login,
            password,
            passwordConfirmation,
            role
        })
        const data = await response.data
    } catch (error) {
        console.log(error)
    }
}


export const updateUser = (id, name, surname, email, role) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8080/users/update/userId/${id}`, {
            name,
            surname,
            email,
            role
        })
        dispatch(fetchAllUsers());
    } catch (error) {
        console.log(error)
    }
}


export const fetchUserInfos = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"))

    try {
        const response = await axios.get(`http://localhost:8080/users/login/${user.login}`);
        const data = await response.data;
        dispatch(setUserInfos(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchUserLessons = (lessonsIds) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"))

    try {
        const response = await axios.get(`http://localhost:8080/lessons/ids/${lessonsIds}`);
        const data = await response.data;
        dispatch(setUserLessons(data))
    } catch (error) {
        console.log(error);
    }
}


export const fetchUserLesson = (lessonsId) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const response = await axios.get(`http://localhost:8080/lessons/id/${lessonsId}`);
        const data = await response.data;
        dispatch(setUserLessons(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllUsers = () => async (dispatch) => {
    const response = await axios.get("http://localhost:8100/users");
    dispatch(getAllUsers(response.data));
};


export const logout = () => async (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    dispatch(removeUserData());
    dispatch(logoutSuccess());
};


export const addLessonToUser = (user, lesson) => async (dispatch) =>{
    console.log(user)
    console.log(`http://localhost:8100/users/update/userId/${user.id}/lessonId/${lesson}`)
    try {
        const response = await axios.put('http://localhost:8080/users/update/userId/1asd/lessonId/3less');
        const data = await response.data;
        console.log('-------------')
        console.log(data)
        console.log('-------------')
    } catch (error) {
        console.log(error)
    }

}