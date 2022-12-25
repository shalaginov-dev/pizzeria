import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Skeleton} from "../components";
import {fetchPizzaById} from "../redux/pizza/asyncActions";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {STATUS} from "../redux/pizza/pizzaTypes";

const typesName = ['тонкое', 'традиционное']

function SinglePizza() {
    const dispatch = useAppDispatch()
    const pizza = useAppSelector(state => state.pizza.items[0])
    const loading = useAppSelector(state => state.pizza.loading)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPizzaById(id as string))
    }, [])

    useEffect(() => {
        if (loading === STATUS.FAILED) {
            alert('Нету такой пиццы')
            navigate('/')
        }
    }, [loading])

    return (!pizza
            ? <div className="pizza-block-wrapper">
                <Skeleton/>
            </div>
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

export default SinglePizza