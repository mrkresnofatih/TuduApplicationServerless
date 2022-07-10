import { SSM } from '@aws-sdk/client-ssm'
import jwt from 'jsonwebtoken'

const ssm = new SSM({ region: process.env.TUDUAPPREGION })

const getJwtSecret = (
    callback: (secret: string) => void
) => {
    ssm.getParameter({ Name: process.env.TUDUAPPJWTSECRET }, (e, data) => {
        if (e) {
            console.log("get jwt secret failed")
        } else {
            const secret = data?.Parameter?.Value ?? "extraSuperUltraMega123456789Secret"
            callback(secret);
        }
    })
}

export const createAccessToken = (
    username: string, 
    callback: (token: string) => void
) => {
    getJwtSecret((secret) => {
        const token = jwt.sign({
            username: username,
        }, secret)
        callback(token);
    })
}

export const validateAccessToken = (
    token: string, 
    onSuccess: () => void,
    onFail: () => void
) => {
    getJwtSecret((secret) => {
        try {
            jwt.verify(token, secret)
            onSuccess();
        } catch(err) {
            onFail();
        }
    })
}

export const extractUsernameFromToken = (
    token: string, 
    callback: (username: string) => void
) => {
    const decoded = jwt.decode(token)
    if (decoded) {
        const username = (decoded as TokenPayload).username
        callback(username)
    }
}

interface TokenPayload {
    username: string
}