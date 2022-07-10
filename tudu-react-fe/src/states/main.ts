import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { AuthAction } from './authAction'
import authReducer from './authReducer'
import { DbAction } from './dbAction'
import dbReducer from './dbReducer'

const allReducers = combineReducers({
    auth: authReducer,
    db: dbReducer
})

export const store = configureStore({
    reducer: allReducers
})

export type AllState = ReturnType<typeof allReducers>

export type ReduxAction = AuthAction | DbAction