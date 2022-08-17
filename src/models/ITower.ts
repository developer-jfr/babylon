export type IME = {
    level: number
    login: string
    phone_number: string
    crypto_wallet: string
    comment: string
}

export type IPAUpdateMe = {
    first_name: string,
    last_name: string,
    phone: string
}

export type ITWUpdateMe = {
    id: string
    username: string
    first_name: string
    last_name: string
    email: string
    phone: string
}

export type IUserInfo = {
    comment: string
    email: string
    phone: string
    username: string
}


export type IMyWorkers =
    {
        id: string,
        user: {
            id: string
            username: string
        },
        area: {
            id: string
            level: {
                id: string
                article: number
                name: string
                material: {
                    id: string
                    name: string
                    price: number
                }
            },
            workers_count: number
        },
        area_order: number
        queue: {
            id: string
            level: {
                article: number
                id: string
            }
        }
        queue_order: number
        current_level: number | undefined
    }


export type IAreInfo = {

    id: string
    level: {
        id: string
        article: number
        name: string,
        material: {}
    },
    created_at: string
    workers_count: number
    area_workers: {
        bosses: [
            {
                id: string
                type: string,
                user: {
                    id: string
                    username: string
                },
                area_order: number
                queue_order: number
            }
        ],
        brigadiers: [
            {
                id: string
                type: string,
                user: {
                    id: string
                    username: string
                },
                area_order: number
                queue_order: number
            }
        ],
        foremen: [
            {
                id: string
                type: string,
                user: {
                    id: string
                    username: string
                },
                area_order: number
                queue_order: number
            }
        ],
        builders: [
            {
                id: string
                type: string,
                user: {
                    id: string
                    username: string
                },
                area_order: number
                queue_order: number
            }
        ]
    }
}

export type IWorker = {
    id: string
    type: string
    user: {
        id: string
        username: string
    },
    area_order: number
    queue_order: number
}

//---------------- Faq -------------------
export type IMainFaq = {
    id: string
    created_at: string
    title: string,
    part1: string
    part2: string
    part3: string
}


export type IMyFaq = {
    id: string
    created_at: string
    question: string,
    answer: string,
    ordering: 0
}

//-------------- Stattistics ----------------
export type IMainStatistics = {

    id: string
    created_at: string
    title: string
    finished_areas: number
    users: number
    workers: number
    max_level: number
}

// -------------- Enter Level ------------
export type IEnterLevel = {
    message: string
}

// --------------- My Statistics -------------------
export type IMyStatistics = {
    id: string
    username: string,
    first_name: string,
    last_name: string,
    email: string
    phone: string,
    statistic: {
        id: string
        finished_areas: number
        earned: number
        workers: number
    }
}

//---------------- Queue Level -------------
export type IQueueWorksers = {
    id: string
    type: string
    user: {
        id: string
        username: string
    }
    area_order: number
    queue_order: number
}

export type IQueueLevel = {
    id: string
    level: {
        id: string
        article: number
        name: string
        material: {
            id: string
            name: string
            price: string
        }
    },
    queue_workers: Array<IQueueWorksers>
}

// -------------------- Request -------------
export type IRequestApprove = {

    id: string
    is_approved: boolean
    area: {
        id: string
    },
    from_user: {
        id: string
        username: string
    },
    to_user: {
        id: string
        username: string
    }
}


//------------- My Materials --------------------
export type IMyMaterials = {
    id: string
    user: {
        id: string
        username: string
    },
    material: {
        id: string
        name: string,
        image: string,
        price: string
    },
    quantity: 0
}


// --------------- Boss Info ---------------
export type IBossInfo = {
    worker: {
        id: string
        type: string,
        user: {
            id: string
            username: string
        },
        area_order: number
        queue_order: number
    },
    cards: [
        {
            id: string
            bank: string
            number: string
        }
    ],
    crypto: [
        {
            id: string
            name: string
            address: string
            network: string
        }
    ]
}

// ------------------ Startegy list ----------------
export type IStrategyList = {
    id: string
    name: string,
    key: string,
    article: number
}