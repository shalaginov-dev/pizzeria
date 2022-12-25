import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SimpleModal, Skeleton} from "../components";
import {fetchPizzaById} from "../redux/pizza/asyncActions";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {STATUS} from "../redux/pizza/pizzaTypes";

const typesName = ['тонкое', 'традиционное']

function SinglePizza() {
    const dispatch = useAppDispatch()
    const pizza = useAppSelector(state => state.pizza.items[0])
    const loading = useAppSelector(state => state.pizza.loading)
    const [modalActive, setModalActive] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPizzaById(id as string))
    }, [])

    useEffect(() => {
        if (loading === STATUS.FAILED) {
            setModalActive(true)
        }
    }, [loading])

    return (!pizza
            ? <div className="pizza-block-wrapper">
                <SimpleModal
                    active={modalActive}
                    onConfirmCLick={() => {
                        navigate('/')
                    }}
                    value={'Такой пиццы нету'}
                    onActiveModalClick={() => {
                        navigate('/')
                    }}
                />
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
                                pizza.types.map((t) => (
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