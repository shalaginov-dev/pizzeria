import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {FetchPizzaParams, Pizza, PizzaItem, STATUS} from "../../@types/redux/pizza";
import {pizzaAPI} from "../../api/pizza-api";

const initialState: Pizza = {
    items: [],
    status: STATUS.LOADING
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaParams>(
    'pizza/fetchPizzas',
    async ({currentPage, sortBy, order, category, search}) => {
        return await pizzaAPI.fetchPizzas(currentPage, sortBy, order, category, search)
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = STATUS.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = STATUS.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = STATUS.ERROR
            state.items = []
        })
    }
})

export default pizzaSlice.reducer