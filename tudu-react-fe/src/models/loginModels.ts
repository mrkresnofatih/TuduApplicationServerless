export type LoginRequestModel = {
    username: string,
    password: string
}

export type LoginResponseModel = {
    username: string,
    accessToken: string,
    fullName: string,
    occupation: string
}