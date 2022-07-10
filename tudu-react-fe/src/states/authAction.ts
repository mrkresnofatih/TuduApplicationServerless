import { AuthActionNames } from "./authActionNames";

interface AuthSetUsernameActionType {
    type: AuthActionNames.SET_USERNAME,
    data: string
}

interface AuthSetAccessTokenActionType {
    type: AuthActionNames.SET_ACCESSTOKEN,
    data: string
}

interface AuthSetFullNameActionType {
    type: AuthActionNames.SET_FULLNAME,
    data: string
}

interface AuthSetOccupationActionType {
    type: AuthActionNames.SET_OCCUPATION,
    data: string
}

interface AuthResetActionType {
    type: AuthActionNames.RESET
}

export type AuthAction = 
    AuthSetAccessTokenActionType
    | AuthSetUsernameActionType
    | AuthSetFullNameActionType
    | AuthSetOccupationActionType
    | AuthResetActionType
