import axios from 'axios';
import { IAuth } from 'models/IAuth';
import { IPreviousMessage } from 'models/IChat';



const instance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        "Content-type": 'application/json'
    }
});


export const ChatServices = {
    async getRoomToken(id: string | null) {
        return instance.get<IAuth>(`chat/${id}`).then(res => res);
    },
    async getPreviousMessage(id: string | null) {
        return instance.get<IPreviousMessage>(`chat/previous_messages/${id}`).then(res => res);
    }
}