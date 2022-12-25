import {minusItem, plusItem, removeItem} from "../redux/cart/cartSlice";
import {useAppDispatch} from "../redux/hooks";
import {Modal} from "./Helpers/Modal";
import {useState} from "react";

interface CartPizzaItemProps {
    id: string
    title: string
    type: string
    size: number
    price: number
    count: number
    imageUrl: string
}

export function CartPizzaItem({id, title, type, size, price, count, imageUrl}: CartPizzaItemProps) {
    const dispatch = useAppDispatch()
    const [modalActive, setModalActive] = useState(false)

    const handleClickPlus = () => {
        dispatch(plusItem(id))
    }
    const handleClickMinus = () => {
        dispatch(minusItem(id))
    }
    const handleClickRemove = () => {
            dispatch(removeItem(id))
    }

    return (
        <div className="cart__item">
            <Modal
                active={modalActive}
                value={'Удалить данный товар?'}
                onActiveModalClick={(value) => setModalActive(value)}
                onConfirmCLick={handleClickRemove}
            />
            <div className="img_title">
                <div className="cart__item-img">
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                </div>
                <div className="cart__item-info">
                    <h3>{title}</h3>
                    <p>{type}, {size} см.</p>
                </div>
            </div>
            <div className="count_price">
                <div className="cart__item-count">
                    <button
                        disabled={count === 1}
                        onClick={handleClickMinus}
                        className="button button--outline button--circle cart__item-count-minus"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                fill="#EB5A1E"/>
                            <path
                                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                fill="#EB5A1E"/>
                        </svg>
                    </button>
                    <b>{count}</b>
                    <button onClick={handleClickPlus}
                            className="button button--outline button--circle cart__item-count-plus">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                fill="#EB5A1E"/>
                            <path
                                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                fill="#EB5A1E"/>
                        </svg>
                    </button>
                </div>
                <div className="cart__item-price">
                    <b>{price * count} ₽</b>
                </div>

                <div className="cart__item-remove">
                    <button onClick={() => setModalActive(true)} className="button button--circle cart__item-remove-btn">
                        <svg width="15" height="15" viewBox="0 0 48 48" fill="#787878"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"
                            />
                            <path
                                d="M0 0h48v48h-48z" fill="none"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}