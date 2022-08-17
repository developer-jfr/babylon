export type IPrizes =
    {
        id: string
        name: string
        description: string
        prize_name: string
        image: string
    }

export type IContestPrizes = {
    id: string
    name: string
    description: string
    prize_name: string
    image: string
    date_from: string
    date_until: string
}