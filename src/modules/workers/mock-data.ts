 const workersData = [
    {
        id: 1,
        level: 1,
        active: false
    },
    {
        id: 2,
        level: 2,
        active: false
    },
    {
        id: 3,
        level: 3,
        active: false
    },
    {
        id: 4,
        level: 4,
        active: false
    },
    {
        id: 5,
        level: 5,
        active: false
    },
    {
        id: 6,
        level: 6,
        active: false
    },
    {
        id: 7,
        level: 7,
        active: false
    },
    {
        id: 8,
        level: 8,
        active: false
    },
    {
        id: 9,
        level: 9,
        active: false
    },
    {
        id: 10,
        level: 10,
        active: false
    },
    {
        id: 11,
        level: 11,
        active: false
    },
    {
        id: 12,
        level: 12,
        active: false
    },
    {
        id: 13,
        level: 13,
        active: false
    },
    {
        id: 14,
        level: 14,
        active: false
    },
    {
        id: 15,
        level: 15,
        active: false
    },
    {
        id: 16,
        level: 16,
        active: false
    },
    {
        id: 17,
        level: 17,
        active: false
    },
    {
        id: 18,
        level: 18,
        active: false
    },
    {
        id: 19,
        level: 19,
        active: false
    },
    {
        id: 20,
        level: 20,
        active: false
    }
]


export const workersHandle = (num: number) => {
    workersData.map(e => {
        if(num >= e.id) {
            e.active=true
        } 
    })

    return workersData
}