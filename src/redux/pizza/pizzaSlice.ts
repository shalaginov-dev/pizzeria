import {createSlice} from '@reduxjs/toolkit'
import {Pizza, STATUS} from "./pizza-types";
import {fetchPizzas} from "./asyncActions";

const initialState: Pizza = {
    items: [],
    status: STATUS.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = STATUS.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = STATUS.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = STATUS.ERROR
                state.items = []
            })
    }
})

export default pizzaSlice.reducer