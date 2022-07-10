export type SignupRequestModel = {
    fullName: string,
    username: string,
    password: string,
    occupation: string
}

export type SignupResponseModel = {
    username: string,
    fullName: string
}