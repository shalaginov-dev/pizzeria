import axios from "axios";
import {PizzaItem} from "../redux/pizza/pizza-types";


export const pizzaAPI = {
    fetchPizzas(currentPage: number, sortBy: string, order: string, category: string, search: string) {
        return axios.get<PizzaItem[]>(`https://637a27eb7419b414df9b01cf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
            .then(response => response.data)
    },
    fetchPizzaById(id: string) {
        return axios.get<PizzaItem>(`https://637a27eb7419b414df9b01cf.mockapi.io/items/${id}`)
            .then(response => response.data)
    }
}