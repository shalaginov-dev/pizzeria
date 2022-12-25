import {CartPizzaItem} from "../redux/cart/cartTypes";

export const calculateTotalPrice = (items: CartPizzaItem[]) => {
    return  items.reduce((acc, el) => acc + (el.price * el.count), 0)
}