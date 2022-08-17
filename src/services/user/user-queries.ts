import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthServices } from "./user-services"

export const useUserMe = () => {
    return useQuery(['users me'], () => AuthServices.getUsersMe())
}


export const useGetUserDetails = () => {
    return useQuery(['users details'], () => AuthServices.getUserDetails())
}

export const useGetUserDetailsByID = (id: string) => {
    return useQuery(['users detailsid'], () => AuthServices.getUserDetailsById(id))
}

export const useSendEmailCode = (email: string) => {
    return useMutation(['send email'], () => AuthServices.sendEMailCode(email))
}

export const useSetMyData = (first_name: string, last_name:string, phone: string) => {
    return useMutation(['set my data'], () => AuthServices.setMyData(first_name, last_name, phone))
}

export const useRefreshUserToken = (refresh_token: string | null, type: string) => {
    return useMutation(['refresh token'], () => AuthServices.refreshTokenUser(refresh_token, type))
}