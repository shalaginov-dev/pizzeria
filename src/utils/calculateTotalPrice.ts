import {CartPizzaItem} from "../redux/cart/cart-types";

export const calculateTotalPrice = (items: CartPizzaItem[]) => {
    return  items.reduce((acc, el) => acc + (el.price * el.count), 0)
}