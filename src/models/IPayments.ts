export type IBankPayment = {
    bank: string
    number: string
    id: string
    user: {
        id: string
        username: string
    }

}



export type IBankCreate = {
    bank: string
    number: string
}

export type IBankUpdate = {
    id: string
    bank: string
    number: string
}

//----------------- Crypto Walllet -----------------
export type ICryptoWAllet = {
    name: string
    address: string
    network: string
}

export type ICryptoWAlletUpdate = {
    id: string
    name: string
    address: string
    network: string
}


export type ICryptoPayment = {

    name: string,
    address: string,
    network: string,
    id: string
    user: {
        id: string
        username: string
    }
}