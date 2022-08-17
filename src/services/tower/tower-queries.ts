import { useQuery } from "@tanstack/react-query"
import { TowerServices } from "./tower-services"

export const useGetMyWorkers = () => {
    return useQuery(['my workers'], () => TowerServices.getMyWorkers())
}

let pk = localStorage.getItem('pk');

export const useGetAreInfo = (areaId: string) => {
    return useQuery(['area info'], () => TowerServices.getAreaInfo(areaId))
}

export const useGetMainFaq = () => {
    return useQuery(['main faq'], () => TowerServices.getMainFaq())
}

export const useGetMyFaq = () => {
    return useQuery(['my faq'], () => TowerServices.getMyFaq())
}


export const useGetMainStatistics = () => {
    return useQuery(['main statistics'], () => TowerServices.getMainStatistics())
}

export const useGetMyStatistics = () => {
    return useQuery(['my statistics'], () => TowerServices.getMyStatistics())
}


export const useGetQueue = (id: string | null) => {
    return useQuery(['queue'], () => TowerServices.getQueueLevel(id))
}


export const useGetRequestApprove = (id: string | undefined) => {
    return useQuery(['request approve'], () => TowerServices.getRequestInfo(id))
}


export const useGetMyMaterials = () => {
    return useQuery(['my materials'], () => TowerServices.getMyMaterial())
}

export const useGetBossInfo = (id: string | undefined) => {
    return useQuery(['boss info'], () => TowerServices.getBossInfo(id))
}

export const useGetEnterLevel = (id: string) => {
    return useQuery(['enter level'], () => TowerServices.getEnterLevel(id), {
        refetchOnWindowFocus:false,
        enabled: false
    })
}