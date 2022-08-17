import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {  IChangePassword } from "models/IAuth";
import { IME, IUserInfo } from "models/ITower";


interface PaymentState {
    succes: boolean,
    error: string,
    request: boolean
    approve: boolean
}

const initialState: PaymentState = {
    succes: false,
    error: '',
    request: false,
    approve: false
}


export const paymentsSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setSucces(state, action:PayloadAction<boolean>) {
            state.succes=action.payload
        },
        setError(state, action:PayloadAction<string>) {
            state.error=action.payload
        },
        setRequest(state, action: PayloadAction<boolean>) {
            state.request=action.payload
        },
        setApprove(state, action: PayloadAction<boolean>) {
            state.approve=action.payload
        }
    }
});




export default paymentsSlice.reducer;
