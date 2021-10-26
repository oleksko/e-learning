import * as UserActions from "../../actions/user";

const initialState = {
    loadingUser: false,
    errorUser: null,
    userData: '',
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || {},
    userDetails: []
}

const userReducer = (state = initialState , action) => {
    console.log("USER REDUCER")
    console.log(action)
    console.log(state.userData)
    console.log("USER REDUCER")
    switch (action.type) {
        case UserActions.LOGIN_USER:
            return {
                ...state,
                userData: action.payload,
            };
        case UserActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case UserActions.USER_LOADING:
            return {
                ...state,
                loadingUser: true,
            };
        case UserActions.USER_LOADING_END:
            return {
                ...state,
                loadingUser: false,
            };
        case UserActions.FETCH_USER_INFO:
            return {
                ...state,
                userDetails:  action.payload
            }
        default:
            return state;
    }
}

export default userReducer;

// TODO https://github.com/bottega-code-school/prop-management/blob/master/src/reducers/authReducer.js