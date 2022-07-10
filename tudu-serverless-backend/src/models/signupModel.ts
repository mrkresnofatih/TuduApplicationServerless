export type SignupRequest = {
    username: string,
    fullName: string,
    password: string,
    occupation: string
}

export type SignupResponse = {
    username: string,
    fullName: string
}