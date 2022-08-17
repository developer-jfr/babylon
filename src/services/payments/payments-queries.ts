import { useMutation, useQuery } from "@tanstack/react-query"
import { PaymentsServices } from "./payments-services"

export const useGetBankPayment = () => {
    return useQuery(['getbank payment'], () => PaymentsServices.getBankCards())
}

export const useGetCryptoWallets = () => {
    return useQuery(['crypto walllets'], () => PaymentsServices.getCryptoWallets())
}

