import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {  IChangePassword } from "models/IAuth";
import { IME, IUserInfo } from "models/ITower";


interface TowerState {
    succes: boolean
    isEnterLevel: boolean
}

const initialState: TowerState = {
    succes: false,
    isEnterLevel: false
}



export const towerSlice = createSlice({
    name: 'tower',
    initialState,

    reducers: {
        setSucces(state, action: PayloadAction<boolean>) {
            state.succes=action.payload
        },
        setEnterLevel(state, action: PayloadAction<boolean>) {
            state.isEnterLevel=action.payload
        }
    }
});




export default towerSlice.reducer;
/*
[register.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
    state.error = '';
    localStorage.setItem('access_token', action.payload.access_token);
    state.isRegister = true;
},

[register.rejected.type]: (state,  action: PayloadAction<string>) => {
    state.error = action.payload;
},
[login.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
    state.error = ''
    localStorage.setItem('access_token', action.payload.access_token)
    state.isLogined = true;
},

[login.rejected.type]: (state,  action: PayloadAction<string>) => {
    state.error = action.payload;
},
[sendEmailCode.fulfilled.type]: (state) => {
    state.error = ''
    state.isEmailSend=true
},
[checkCode.fulfilled.type]: (state) => {
    state.error = ''
    state.isCodeChecked=true;
},
[changePassword.fulfilled.type]: (state, action: PayloadAction<IChangePassword>) => {
    state.error = ''
    state.changePassword = action.payload
},

*/