import axios from "axios";


export const pizzaAPI = {
        fetchPizzas(currentPage, category, sortBy, order){
            axios.get(`https://637a27eb7419b414df9b01cf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
                .then(response => response)
        }
}
