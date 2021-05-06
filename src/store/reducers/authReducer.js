import { AUTH } from "../actions/actionTypes"

const initialState = {
    isAuthed: false,
    user: null
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                isAuthed: action.payload.isAuthed,
                user: action.payload.user
            }
        default: return state
    }
}