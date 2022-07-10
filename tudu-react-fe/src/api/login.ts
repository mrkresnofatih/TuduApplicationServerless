import axios from 'axios';
import { LoginRequestModel, LoginResponseModel } from '../models/loginModels';
import { batchDispatch } from '../states/batchDispatch';
import { ReduxAction } from '../states/main';
import { apiConfig } from './apiConfig';

export const loginAPI = (
    loginRequest : LoginRequestModel,
    successDispatch: (result: LoginResponseModel) => ReduxAction[]
) => {
    axios({
        method: 'post',
        url: `${apiConfig.baseUrl}/auth/login`,
        data: loginRequest
    }).then((response) => {
        const {data, errorCode} = response.data;
        console.log("API-LOGIN: ", data)
        if (errorCode === null) {
            batchDispatch([
                ...(successDispatch(data))
            ])
        }
    })
}