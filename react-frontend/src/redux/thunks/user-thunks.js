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

        dispatch(loginUser(decodedToken));
        dispatch(userLoadingEnd());
        dispatch(setToken(data.accessToken));
        dispatch(fetchUserLessons(decodedToken.lessonsIds));
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(userLoadingEnd());

    } catch (error) {
        console.log(error);
    }
}

export const addUser = (name, surname, email, login, password, passwordConfirmation, role) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/users/register', {
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

export const updateUser = (id, name, surname, email, login, role) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8080/users/update/userId/${id}`, {
            name,
            login,
            surname,
            email,
            role
        })
        dispatch(fetchAllUsers());
        dispatch(fetchUser(login));
    } catch (error) {
        console.log(error)
    }
}


export const fetchUser = (login) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/users/login/${login}`);
        const data = await response.data;
        dispatch(setUserInfos(data))
    } catch (error) {
        console.log(error);
    }
}


export const fetchUserLessons = (lessonsIds) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/lessons/ids/${lessonsIds}`);
        const data = await response.data;
        dispatch(setUserLessons(data))
    } catch (error) {
        console.log(error);
    }
}


export const fetchAllUsers = () => async (dispatch) => {
    const response = await axios.get("http://localhost:8080/users");
    dispatch(getAllUsers(response.data));
};


export const logout = () => async (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    dispatch(removeUserData());
    dispatch(logoutSuccess());
};


export const addLessonToUser = (user, lesson) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8080/users/update/userId/${user.id}/lessonId/${lesson}`);
        const data = await response.data;
        dispatch(fetchUserInfo(user));
    } catch (error) {
        console.log(error)
    }

}


export const fetchUserInfo = (user) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/users/login/${user.login}`);
        const data = await response.data;
        dispatch(setUserInfos(data))
    } catch (error) {
        console.log(error);
    }
}
