import axios from 'axios';
import { IBankPayment, ICryptoPayment } from 'models/IPayments';

let token = localStorage.getItem('access_token');


const instance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        "Content-type": 'application/json'
    }
});


export const PaymentsServices = {
    async getBankCards() {
      return  instance.get<Array<IBankPayment>>('payments/my_cards').then(res => res)
    },
    async getCryptoWallets() {
      return  instance.get<Array<ICryptoPayment>>('payments/my_crypto').then(res => res)
    },
}