import {useState} from "react";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

import {addItem} from "../../redux/cart/cartSlice";

interface PizzaBlockProps {
    id: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    imageUrl: string
    rating: number
}

const typesName = ['тонкое', 'традиционное']

export function PizzaBlock({id, title, types, sizes, price, imageUrl}: PizzaBlockProps) {
    const dispatch = useAppDispatch()
    const cartItem = useAppSelector(state => state.cart.items.filter(obj => obj.title === title))

    const [activeType, setActiveType] = useState(types[0])
    const [activeSize, setActiveSize] = useState(0)

    const addedCount = cartItem ? cartItem.reduce((acc, el) => acc + el.count, 0) : 0

    const handleClickAddPizza = () => {
        const item = {
            id,
            imageUrl,
            title,
            type: typesName[activeType],
            size: sizes[activeSize],
            price,
        }
        dispatch(addItem(item))
    }
    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <div className="pizza-block-link">
                    <Link to={`/pizza/${id}`}>
                        <img
                            className="pizza-block__image"
                            src={imageUrl}
                            alt="Pizza"
                        />
                        <div className="pizza-block__title-wrapper">
                            <h4 className="pizza-block__title">{title}</h4>
                        </div>
                    </Link>
                </div>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((t, index) => (
                                <li
                                    key={t}
                                    onClick={() => setActiveType(index)}
                                    className={activeType === t ? 'active' : ''}
                                >{typesName[t]}
                                </li>))
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((s, index) => (
                                <li
                                    key={index}
                                    onClick={() => setActiveSize(index)}
                                    className={activeSize === index ? 'active' : ''}
                                >{s} см.
                                </li>))
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button onClick={handleClickAddPizza} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    )
}