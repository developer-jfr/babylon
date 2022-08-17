import { useQuery } from "@tanstack/react-query"
import { PrizesServices } from "./prizes-services"

export const useGetMyPrizes = () => {
    return useQuery(['prizes'], () => PrizesServices.getPrizes())
}

