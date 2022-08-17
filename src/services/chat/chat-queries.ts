import { useQuery } from "@tanstack/react-query"
import { ChatServices } from "./chat-services"



export const useGetRoomToken = (id: string | null) => {
    return useQuery(['room token'], () => ChatServices.getRoomToken(id))
}

export const usePreviousMessage = (id: string | null) => {
    return useQuery(['prev message'], () => ChatServices.getPreviousMessage(id))
}

