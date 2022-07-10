import axios from "axios";
import { SignupRequestModel } from "../models/signupModels";
import { batchDispatch } from "../states/batchDispatch";
import { ReduxAction } from "../states/main";
import { apiConfig } from "./apiConfig";

export const signupAPI = (
    signupRequest : SignupRequestModel, 
    successDispatch: (result: any) => ReduxAction[]
) => {
    axios({
        method: 'post',
        url: `${apiConfig.baseUrl}/auth/signup`,
        data: signupRequest
    }).then((response) => {
        const {data, errorCode} = response.data;
        console.log("API-SIGNUP: ", data)
        if (errorCode === null) {
            batchDispatch([
                ...(successDispatch(data))
            ])
        }
    })
}
