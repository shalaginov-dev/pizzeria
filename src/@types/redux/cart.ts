interface CartPizzaItem {
    id: string
    imageUrl: string
    title: string
    type: string
    size: number
    price: number
    count: 1
}
export interface Cart {
    totalPrice: number
    items: CartPizzaItem[]
}

export interface CartItem {
    id : string
    imageUrl: string
    title: string
    type: string
    size: number
    price: number
}