import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import { towerSlice } from "./reducer";



let bearerInstance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers:     {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    }
});


export const enterLevel = createAsyncThunk(
    'SN/AUTH/ENTER_LEVEL',
    async ( token: string | null, thunkAPI) => {
        try { 
        return   bearerInstance.get('tower/enter_level/', { headers: { "Authorization": `Bearer ${token}` }}).then(res => {
            if(res.status === 200) {
                thunkAPI.dispatch(towerSlice.actions.setEnterLevel(true))
            }
        })
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)



export const getMyWorkser = createAsyncThunk(
    'SN/AUTH/READ_USER_ME',
    async (_, thunkAPI) => {
        try { 
        return   bearerInstance.get('tower/my_workers/').then(res => {
            
        })
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)



export const getPaymentsInfo = createAsyncThunk(
    'SN/AUTH/PAYMENTS_INFO',
    async (id: string | undefined, thunkAPI) => {
        try { 
        return   bearerInstance.get(`tower/approve/${id}`).then(res => {
            if(res.status === 200) {
                thunkAPI.dispatch(towerSlice.actions.setSucces(true))
            }
            
        })
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)