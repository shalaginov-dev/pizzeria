import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async ({currentPage, sortBy, order, category}) => {
        const {data} = await axios.get(`https://637a27eb7419b414df9b01cf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading'
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'success'
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error'
            state.items = []
        })
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer