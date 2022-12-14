import axios from "axios";
import {PizzaItem} from "../@types/redux/pizza";


export const pizzaAPI = {
        fetchPizzas (currentPage : number, sortBy: string, order: string, category: string, search: string){
            return axios.get<PizzaItem[]>(`https://637a27eb7419b414df9b01cf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
                .then(response => response.data)
        }
}
