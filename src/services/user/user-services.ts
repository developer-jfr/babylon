import axios from 'axios';
import { IAuth, IUpdateMeRes, IUserDetails, IUsersMe } from 'models/IAuth';

let token = localStorage.getItem('access_token');


const instance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        "Content-type": 'application/json'
    }
});

const instanceWithOutToken = axios.create({
    baseURL: ''
})


export const AuthServices = {
    async getUsersMe  ()  {
        return instance.get<IUsersMe>('users/me/').then(res => res)
    },
    async getUserDetails  ()  {
        return instance.get<IUserDetails>(`users/detail/${localStorage.getItem('userId')}`).then(res => res)
    },
    async getUserDetailsById  (id: string)  {
        return instance.get<IUserDetails>(`users/detail/${id}`).then(res => res)
    },
    async setMyData  (first_name: string, last_name: string, phone: string)  {
        return instance.put<IUpdateMeRes>(`/users/set_my_data/${localStorage.getItem('access_token')}`, {first_name, last_name, phone}).then(res => res)
    },
    async refreshTokenUser (refresh_token: string | null, type: string)  {
        return instance.post<IAuth>(`/users/refresh`, {refresh_token, type}).then(res => res)
    },
    async sendEMailCode (email: string)  {
        return instance.post('/users/reset_password_code', {email}).then(res => res)
    }
}

   