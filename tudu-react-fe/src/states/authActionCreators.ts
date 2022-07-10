import { AuthAction } from "./authAction"
import { AuthActionNames } from "./authActionNames"

export const AuthSetUsername = (username: string): AuthAction => {
    return {
        type: AuthActionNames.SET_USERNAME,
        data: username
    }
}

export const AuthSetAccessToken = (token: string): AuthAction => {
    return {
        type: AuthActionNames.SET_ACCESSTOKEN,
        data: token
    }
}

export const AuthSetFullName = (fullName: string): AuthAction => {
    return {
        type: AuthActionNames.SET_FULLNAME,
        data: fullName
    }
}

export const AuthSetOccupation = (occupation: string): AuthAction => {
    return {
        type: AuthActionNames.SET_OCCUPATION,
        data: occupation
    }
}

export const AuthReset = () : AuthAction => {
    return {
        type: AuthActionNames.RESET
    }
}