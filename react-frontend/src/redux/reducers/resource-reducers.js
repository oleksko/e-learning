import * as ResourceActions from "../actions/resource-actions";


const initialState = {
    resources: []
}

const ResourceReducers = (state = initialState, action) => {
    switch (action.type) {
        case ResourceActions.ADD_RESOURCE:
            return {
                ...state,
                resources: action.payload
            }
        default:
            return state
    }
}
