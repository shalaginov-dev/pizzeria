export enum STATUS {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
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
    status: STATUS
}

export interface FetchPizzaParams {
    currentPage: number
    category: string
    sortBy: string
    order: string
    search: string
}

