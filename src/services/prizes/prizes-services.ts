import axios from 'axios';
import { IAuth } from 'models/IAuth';
import { IPrizes } from 'models/IPrizes';

let token = localStorage.getItem('access_token');


const instance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    }
});


export const PrizesServices = {
    async getPrizes() {
      return  instance.get<Array<IPrizes>>('prizes').then(res => res)
    }
}