export enum STATUS {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export interface PizzaItem {
    id: string
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number
}

export interface Pizza {
    items: PizzaItem[]
    loading: STATUS
}

export interface FetchPizzaParams {
    currentPage: number
    category: string
    sortBy: string
    order: string
    search: string
}

