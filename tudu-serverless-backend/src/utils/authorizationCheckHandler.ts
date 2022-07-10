import { validateAccessToken } from "./accessTokenHandler";

export const checkAuthorization = (
    event,
    onSuccess: () => void,
    onFail: () => void
) => {
    if (!event.headers["Authorization"]) {
        onFail();
    } else {
        validateAccessToken(event.headers["Authorization"], 
            () => {
                onSuccess()
            },
            () => {
                onFail()
            })
    }
}