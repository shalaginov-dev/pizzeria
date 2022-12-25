import {createSlice} from '@reduxjs/toolkit'
import {Pizza, STATUS} from "./pizzaTypes";
import {fetchPizzaById, fetchPizzas} from "./asyncActions";

const initialState: Pizza = {
    items: [],
    loading: STATUS.IDLE
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.loading = STATUS.PENDING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = STATUS.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.loading = STATUS.FAILED
                state.items = []
            })
            .addCase(fetchPizzaById.pending, (state) => {
                state.loading = STATUS.PENDING
                state.items = []
            })
            .addCase(fetchPizzaById.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.loading = STATUS.SUCCESS
            })
            .addCase(fetchPizzaById.rejected, (state, action) => {
                state.loading = STATUS.FAILED
                state.items = []
            })
    }
})

export default pizzaSlice.reducer