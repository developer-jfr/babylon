export type IMessages  = {
    id: string
    created_at: string
    user: {
        id: string
        username: string
    },
    content: string
}

export type IPreviousMessage= {
    id: string
    created_at: string
    area: {
        id: string
    },
    messages: Array<IMessages>
}