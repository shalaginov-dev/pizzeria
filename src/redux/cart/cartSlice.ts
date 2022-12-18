import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Cart, CartItem} from "./cart-types";
import {calculateTotalPrice} from '../../utils/calculateTotalPrice';
import {getCartLocalStorage} from "../../utils/getCartLocalStorage";

const {items, totalPrice} = getCartLocalStorage()

const initialState: Cart = {
    totalPrice,
    items,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) findItem.count++
            else state.items.push({...action.payload, count: 1})
            state.totalPrice = calculateTotalPrice(state.items)
        },
        plusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) findItem.count++
            state.totalPrice = calculateTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                if (findItem.count <= 1) return
                else findItem.count--
            }
            state.totalPrice = calculateTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = calculateTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },

    },
})

export const {addItem, removeItem, clearItems, plusItem, minusItem} = cartSlice.actions

export default cartSlice.reducer