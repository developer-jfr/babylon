import { IChangePassword, IErrorCode, IErrorCode422, ILogin, INotification, IPersonalArea, IRegister, ISend } from 'models/IAuth';
import {createAsyncThunk} from "@reduxjs/toolkit";
import { IAuth } from "models/IAuth";
import axios from 'axios';
import { authSlice } from './reducer';
import { IEnterLevel, IPAUpdateMe, ITWUpdateMe, IUserInfo } from 'models/ITower';

export const instance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/'
});
export const register = createAsyncThunk(
    'SN/AUTH/REGISTER',
    async ({username, email, password1, password2}: IRegister, thunkAPI) => {
        try { 
         let response = await instance.post<IAuth>('users/register', {username, email, password1, password2})
          .then(res => {
            localStorage.setItem('access_token', res?.data?.access_token);
            localStorage.setItem('refresh_token', res?.data?.refresh_token);
            console.log(JSON.stringify(res.data)+'resdaat');
            if(res.status === 200) thunkAPI.dispatch(authSlice.actions.setIsRegister(true))
          }).catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e?.response?.data.detail)));
           
          console.log(response+'response')
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)


export const login = createAsyncThunk(
    'SN/AUTH/LOGIN',
    async ({username, password}: ILogin, thunkAPI) => {
        try { 
          return   instance.post<IAuth>('users/login', {username, password}).then(res => {
            localStorage.setItem('access_token', res.data.access_token);
            if(res.status === 200) {
                thunkAPI.dispatch(authSlice.actions.setAccessToken(res.data.access_token))
                thunkAPI.dispatch(authSlice.actions.setIsLogined(true));
                thunkAPI.dispatch(authSlice.actions.setToken(res.data.access_token));
            }

          }).catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e?.response?.data.detail)));


        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)


export const registerEndLogin = createAsyncThunk(
    'SN/AUTH/REGISTER_END_LOGIN',
    async ({username, password}: ILogin, thunkAPI) => {
        try { 
          return   instance.post<IAuth>('users/login', {username, password}).then(res => {
            localStorage.setItem('access_token', res.data.access_token);
          })


        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)






export const setMyData = createAsyncThunk(
    'SN/AUTH/SET_MY_DATA',
    async ({ token ,first_name, last_name,phone, comment  }: IPersonalArea, thunkAPI) => {
        try { 
          return   instance.put(`users/set_my_data/${token}`, {first_name, last_name, phone, comment})
          .then(res => {
            if(res.status === 200) {
                thunkAPI.dispatch(authSlice.actions.setIsDataSet(true))
            } 
          })
          
          .catch((e:IErrorCode) =>  {
            thunkAPI.dispatch(authSlice.actions.setError(e.response.data.detail))
          });


        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)





export const updateUserNotification = createAsyncThunk(
    'SN/AUTH/UPDATE_USER_NOTIFICATION',
    async ({ token , tg_notifications, email_notifications}: INotification, thunkAPI) => {
        try { 
          return   instance.put(`users/set_notifications/${token}`, {tg_notifications, email_notifications})
          .then(res => {
            if(res.status === 200) thunkAPI.dispatch(authSlice.actions.setIsRegisterEnd(true))
          })
          
          .catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e?.response?.data.detail)));


        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

//------------------------- Resset Password -------------------------
export const sendEmailCode = createAsyncThunk(
    'SN/AUTH/SEND_EMAIL_CODE',
    async (email: string | undefined, thunkAPI) => {
        try { 
            return instance.post<ISend>('users/reset_password_code', {email}).then(res => {
                if(res.status === 200) thunkAPI.dispatch(authSlice.actions.setEmail(email));
               return res.data.success
            }).catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e?.response?.data.detail)));


        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const checkCode = createAsyncThunk(
    'SN/AUTH/CHECK_CODE',
    async ({email ,code}: {email: string, code: string}, thunkAPI) => {
        try { 
      
        
        return   instance.post<ISend>('users/check_code', {email,code}).then(res => {
            if(res.status === 200) thunkAPI.dispatch(authSlice.actions.setCode(code));
           return res.data.success
        }).catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e?.response?.data.detail)));
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const changePasswordThunk = createAsyncThunk(
    'SN/AUTH/CHANGE_PASSWORD',
    async ({ email,code,password1,password2 }: IChangePassword, thunkAPI) => {
        try { 
        return   instance.post<ISend>('users/reset_password', {email, code,password1,password2}).then(res => res.data.success).catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e.response.data.detail)));
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)


let bearerInstance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers:     {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    }
});


export const updateMe = createAsyncThunk(
    'SN/AUTH/UPDATE_ME',
    async ({ first_name, last_name,phone  }: IPAUpdateMe, thunkAPI) => {
        try { 
          return   bearerInstance.put<ITWUpdateMe>('users/update_me', {first_name, last_name, phone})
          .then(res => {
           
          })
          
          .catch((e:IErrorCode) => thunkAPI.dispatch(authSlice.actions.setError(e.response.data.detail)));


        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const deleteMe = createAsyncThunk(
    'SN/AUTH/DELETE_ME',
    async (_, thunkAPI) => {
        try { 
        return   bearerInstance.delete('users/delete_me').then(res => {
            if(res.status === 200) {
                thunkAPI.dispatch(authSlice.actions.setIsLogined(false))
            }
        })
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)


//----------- Is ME------------------------
export const readUserMe = createAsyncThunk(
    'SN/AUTH/READ_USER_ME',
    async (_, thunkAPI) => {
        try { 
        return   bearerInstance.get<IUserInfo>('users/me').then(res => {
            if(res.status === 200) {
                thunkAPI.dispatch(authSlice.actions.setUserInfo(res.data))
            }
        })
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)


export const towerEnterLevel = createAsyncThunk(
    'SN/AUTH/ENTER_LEVEL',
    async (_, thunkAPI) => {
        try { 
        return   bearerInstance.get<IEnterLevel>('tower/enter_level').then(res => {
            if(res.status === 200) {
                thunkAPI.dispatch(authSlice.actions.setEnterMessage(res?.data?.message))
            }
        })
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)
