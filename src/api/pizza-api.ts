import axios from 'axios'
import { PizzaItem } from '../redux/pizza/pizzaTypes'

export const pizzaAPI = {
	fetchPizzas(
		currentPage: number,
		sortBy: string,
		order: string,
		category: string,
		search: string
	) {
		return axios
			.get<PizzaItem[]>(
				`https://669fc19ab132e2c136ff0d6b.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
			)
			.then(response => response.data)
	},
	fetchPizzaById(id: string) {
		return axios
			.get<PizzaItem>(`https://669fc19ab132e2c136ff0d6b.mockapi.io/pizza/${id}`)
			.then(response => response.data)
			.catch(error => error)
	},
}
