import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchPizzaParams, PizzaItem} from "./pizza-types";
import {pizzaAPI} from "../../api/pizza-api";


export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaParams>(
    'pizza/fetchPizzas',
    async ({currentPage, sortBy, order, category, search}) => {
        return await pizzaAPI.fetchPizzas(currentPage, sortBy, order, category, search)
    }
)
