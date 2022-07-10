import { AuthAction } from "./authAction";
import { AuthActionNames } from "./authActionNames";

interface AuthState {
    username: string,
    accessToken: string,
    fullName: string,
    occupation: string
}

const initialState : AuthState = {
    username: "",
    accessToken: "",
    fullName: "",
    occupation: ""
}

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionNames.SET_USERNAME: {
            const newState : AuthState = { ...state, username: action.data }
            console.log(action.type, newState);
            return newState;
        }
        case AuthActionNames.SET_ACCESSTOKEN: {
            const newState : AuthState = { ...state, accessToken: action.data }
            console.log(action.type, newState);
            return newState;
        }
        case AuthActionNames.SET_FULLNAME: {
            const newState : AuthState = { ...state, fullName: action.data }
            console.log(action.type, newState);
            return newState;
        }
        case AuthActionNames.SET_OCCUPATION: {
            const newState : AuthState = { ...state, occupation: action.data }
            console.log(action.type, newState)
            return newState;
        }
        case AuthActionNames.RESET: {
            return initialState
        }
        default:
            return state;
    }
}

export default authReducer