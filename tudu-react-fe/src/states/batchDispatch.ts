import { batch } from "react-redux";
import { ReduxAction, store } from "./main";

export const batchDispatch = (actions: ReduxAction[]) => {
    batch(() => {
        actions.forEach((action) => {
            store.dispatch(action)
        })
    })
}