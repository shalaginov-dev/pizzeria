import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Cart, CartItem} from "../../@types/redux/cart";

const initialState: Cart = {
    totalPrice: 0,
    items: [],
}

const calculateTotalPrice = (state: Cart) => {
    state.totalPrice = state.items.reduce((acc, el) => acc + (el.price * el.count), 0)
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if (findItem) findItem.count++
            else state.items.push({...action.payload, count: 1})
            calculateTotalPrice(state)
        },
        plusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) findItem.count++
            calculateTotalPrice(state)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                if (findItem.count <= 1) return
                else findItem.count--
            }
            calculateTotalPrice(state)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            calculateTotalPrice(state)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },

    },
})

export const {addItem, removeItem, clearItems, plusItem, minusItem} = cartSlice.actions

export default cartSlice.reducer