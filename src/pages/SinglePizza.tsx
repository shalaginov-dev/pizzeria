import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {pizzaAPI} from "../api/pizza-api";
import {PizzaItem} from "../redux/pizza/pizza-types";

const typesName = ['тонкое', 'традиционное']


export function SinglePizza() {
    const [pizza, setPizza] = useState<PizzaItem>()
    const {id} = useParams()
    const navigate = useNavigate()

    const fetchPizzaById = async () => {
        try {
            if (id) setPizza(await pizzaAPI.fetchPizzaById(id))
        } catch (e) {
            alert('Такой пиццы у нас нет :(')
            navigate('/')
        }
    }
    useEffect(() => {
        fetchPizzaById()
    }, [])


    return (!pizza ? <p>Загрузка...</p>
            : <div className="pizza-block-wrapper">
                <div className="pizza-block">
                    <img
                        className="pizza-block__image"
                        src={pizza.imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{pizza.title}</h4>
                    <div className="pizza-block__selector">
                        <ul>
                            {
                                pizza.types.map((t, index) => (
                                    <li
                                        key={t}
                                    >{typesName[t]}
                                    </li>))
                            }
                        </ul>
                        <ul>
                            {
                                pizza.sizes.map((s, index) => (
                                    <li
                                        key={index}
                                    >{s} см.
                                    </li>))
                            }
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price" style={{margin: "auto"}}>от {pizza.price} ₽</div>
                    </div>
                </div>
            </div>
    )
}