export type LoginRequest = {
    username: string,
    password: string
}

export type LoginResponse = {
    username: string,
    accessToken: string,
    fullName: string,
    occupation: string
}