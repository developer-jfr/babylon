import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import { IErrorCode } from "models/IAuth";
import { IBankCreate, IBankPayment, IBankUpdate, ICryptoPayment, ICryptoWAllet, ICryptoWAlletUpdate } from "models/IPayments";
import { paymentsSlice } from "./reducer";



let bearerInstance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers:     {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    }
});

export const createBankCard = createAsyncThunk(
    'SN/AUTH/CREATE_CARD',
    async ({bank,number}: IBankCreate, thunkAPI) => {
        try { 
        return  bearerInstance.post<IBankPayment>('payments/cards', {bank, number}).then(res => {
            if(res.status === 200) thunkAPI.dispatch(paymentsSlice.actions.setSucces(true))
        }).catch((e:IErrorCode) => thunkAPI.dispatch(paymentsSlice.actions.setError(e?.response.data.detail)))
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const updateBankCard = createAsyncThunk(
    'SN/AUTH/UPDATE_BANK_CARD',
    async ({id,bank,number}: IBankUpdate, thunkAPI) => {
        try { 
        return  bearerInstance.put<IBankPayment>(`payments/cards/${id}`, {bank, number}).then(res => {
            if(res.status === 200) thunkAPI.dispatch(paymentsSlice.actions.setSucces(true))
        }).catch((e:IErrorCode) => thunkAPI.dispatch(paymentsSlice.actions.setError(e?.response.data.detail)))
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const deleteBankCard = createAsyncThunk(
    'SN/AUTH/DELETE_BANK_CARD',
    async (id: string, thunkAPI) => {
        try { 
        return  bearerInstance.delete(`payments/cards/${id}`).then(res => {
            if(res.status === 200) thunkAPI.dispatch(paymentsSlice.actions.setSucces(true))
        }).catch((e:IErrorCode) => thunkAPI.dispatch(paymentsSlice.actions.setError(e?.response.data.detail)))
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

// ----------------------- Crypto ---------------------
export const createCryptoCard = createAsyncThunk(
    'SN/AUTH/CREATE_CRYPTO_CARD',
    async ({address,name,network}: ICryptoWAllet, thunkAPI) => {
        try { 
        return  bearerInstance.post<ICryptoPayment>('payments/crypto', {name, address, network}).then(res => {
            if(res.status === 200) thunkAPI.dispatch(paymentsSlice.actions.setSucces(true))
        }).catch((e:IErrorCode) => thunkAPI.dispatch(paymentsSlice.actions.setError(e?.response.data.detail)))
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const updateCryptoCard = createAsyncThunk(
    'SN/AUTH/UPDATE_CRYPTO_WALLET',
    async ({id,name,address,network}: ICryptoWAlletUpdate, thunkAPI) => {
        try { 
        return  bearerInstance.put<IBankPayment>(`payments/crypto/${id}`, {name, address,network}).then(res => {
            if(res.status === 200) thunkAPI.dispatch(paymentsSlice.actions.setSucces(true))
        }).catch((e:IErrorCode) => thunkAPI.dispatch(paymentsSlice.actions.setError(e?.response.data.detail)))
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)

export const deleteCryptoCard = createAsyncThunk(
    'SN/AUTH/DELETE_CRYPTO_WALLET',
    async (id: string, thunkAPI) => {
        try { 
        return  bearerInstance.delete(`payments/crypto/${id}`).then(res => {
            if(res.status === 200) thunkAPI.dispatch(paymentsSlice.actions.setSucces(true))
        }).catch((e:IErrorCode) => thunkAPI.dispatch(paymentsSlice.actions.setError(e?.response.data.detail)))
    } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)