

const initialState = {
    resources: []
}

const ResourceReducer = (state = initialState, action) => {
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
