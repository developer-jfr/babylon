import axios from 'axios';
import { IAuth } from 'models/IAuth';
import { IAreInfo, IMainFaq, IMainStatistics, IMyFaq, IMyWorkers,IEnterLevel, IMyStatistics, IQueueLevel, IRequestApprove, IMyMaterials, IBossInfo } from 'models/ITower';

let token = localStorage.getItem('access_token');


const instance = axios.create({
    baseURL: 'https://babylon-api.aitrix.online/',
    headers: {
        "Authorization": `Bearer ${token}`
    }
});


export const TowerServices = {
    async getMyWorkers() {
      return  instance.get<Array<IMyWorkers>>('tower/my_workers/').then(res => res)
    },
    async getAreaInfo(areaId:string) {
        return instance.get<IAreInfo>(`tower/area/${areaId}`).then(res => res);
    },
    async getMainFaq() {
        return instance.get<IMainFaq>('info/main').then(res => res);
    },
    async getMyFaq() {
        return instance.get<Array<IMyFaq>>('info/faq').then(res => res);
    },
    async getMainStatistics() {
        return instance.get<IMainStatistics>('statistics/main/').then(res => res);
    },
    async getEnterLevel(id: string) {
        return instance.get<IEnterLevel>(`tower/enter_level/?level=${id}`).then(res => res);
    },
    async getMyStatistics() {
        return instance.get<IMyStatistics>('statistics/my/').then(res => res);
    },
    async getQueueLevel(id: string | null) {
        return instance.get<IQueueLevel>(`tower/queue/?level=${id}`).then(res => res);
    },
    async getRequestInfo(id: string | undefined) {
        return instance.get<IRequestApprove>(`tower/request_approve/?area=${id}`).then(res => res);
    },
    async getMyMaterial() {
        return instance.get<Array<IMyMaterials>>('tower/my_materials').then(res => res);
    },
    async getBossInfo(id: string | undefined) {
        return instance.get<IBossInfo>('tower/boss_info').then(res => res);
    },
}