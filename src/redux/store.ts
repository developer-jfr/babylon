import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './auth/reducer';
import towerReducer from './tower/reducer';
import paymentReducer from './payments/reducer';

const rootReducer = combineReducers({
    authReducer,
    towerReducer,
    paymentReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
