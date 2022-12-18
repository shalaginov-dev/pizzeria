import {calculateTotalPrice} from "./calculateTotalPrice";

export const getCartLocalStorage = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calculateTotalPrice(items)


    return {items, totalPrice}
}