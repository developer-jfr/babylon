import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {  IChangePassword } from "models/IAuth";
import { IME, IUserInfo } from "models/ITower";


interface AuthState {
    error: string
    isRegister: boolean
    isLogined: boolean
    isEmailSend: boolean
    isDataSet: boolean
    isCodeChecked: boolean
    isRegisterEnd: boolean
    isMe: boolean
    isChangePassword: boolean
    changePassword: IChangePassword
    currentLevel: number
    enterMessage: string
    me: IME,
    token: string
    access_token: string
}

const initialState: AuthState = {
    error: '',
    isRegister: false,
    isLogined: false,
    isDataSet: false,
    isMe: false,
    isEmailSend: false,
    isRegisterEnd: false,
    isCodeChecked: false,
    enterMessage: '',
    isChangePassword: false,
    currentLevel: 1,
    me: {
      login: '',
      comment: '',
      crypto_wallet: '',
      level: 0,
      phone_number: ''
    },
    changePassword: {
        email: '',
        code: '',
        password1: '',
        password2: ''
    },
    token: '',
    access_token: ''
}


export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError(state, action:PayloadAction<string>) {
            state.error = action.payload;
        },
        setEmail(state, action: PayloadAction<string | undefined>) {
           state.changePassword.email = action.payload
           state.isEmailSend = true
           state.isCodeChecked=true
        },
        setCode(state, action: PayloadAction<string>) {
            state.changePassword.code = action.payload
            state.isCodeChecked=false
            state.isChangePassword=true
         },
         setIsRegister(state, action: PayloadAction<boolean>) {
            state.isRegister=action.payload
         },
         setIsLogined(state, action: PayloadAction<boolean>) {
            state.isLogined=action.payload
         },
         setIsDataSet(state, action: PayloadAction<boolean>) {
            state.isDataSet=action.payload
         },
         setIsRegisterEnd(state, action: PayloadAction<boolean>) {
            state.isRegisterEnd=action.payload
         },
         setIsMe(state, action: PayloadAction<boolean>) {
            state.isMe = action.payload
         },
         setUserInfo(state, action: PayloadAction<IUserInfo>) {
            state.me.comment=action.payload.comment
            state.me.login=action.payload.username
            state.me.phone_number=action.payload.phone
         },
         setCurrentLevel(state, action: PayloadAction<number>) {
              state.currentLevel=action.payload
         },
         setEnterMessage(state, action:PayloadAction<string>) {
            state.enterMessage=action.payload
         },
         setToken(state, action: PayloadAction<string>) {
            state.token=action.payload
         },
         setAccessToken(state, action: PayloadAction<string>) {
            state.access_token=action.payload
         }
    },
    extraReducers: {
    }
});




export default authSlice.reducer;
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