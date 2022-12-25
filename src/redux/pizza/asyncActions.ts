import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchPizzaParams, PizzaItem} from "./pizzaTypes";
import {pizzaAPI} from "../../api/pizza-api";


export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaParams>(
    'pizza/fetchPizzas',
    async ({currentPage, sortBy, order, category, search}) => {
        return await pizzaAPI.fetchPizzas(currentPage, sortBy, order, category, search)
    }
)
export const fetchPizzaById = createAsyncThunk<PizzaItem, string>(
    'pizza/fetchPizzaById',
    async (id: string, {rejectWithValue}) => {
        const response = await pizzaAPI.fetchPizzaById(id)
        if (response.name === "AxiosError") {
            return rejectWithValue(response.message)
        }
        return response
    }
)
