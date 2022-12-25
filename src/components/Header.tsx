import {Link, useLocation} from "react-router-dom";
import {useEffect, useRef} from "react";

import {Search} from "./Search";
import logoSvg from '../assets/img/pizza-logo.svg'
import {useAppSelector} from "../redux/hooks";
import {LinearProgress} from "./Helpers/LinearProgress";
import {STATUS} from "../redux/pizza/pizzaTypes";
import {CartButton} from "./Buttons/CartButton";


export function Header() {
    const { items} = useAppSelector(state => state.cart)
    const loading = useAppSelector(state => state.pizza.loading)
    const location = useLocation()
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current){
            const json = JSON.stringify(items)
            localStorage.setItem('cart', json)
        }
        isMounted.current = true
    }, [items])

    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img width="38" src={logoSvg} alt="Pizza logo"/>
                        <div>
                            <h1>Joe's Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                {
                    location.pathname === '/' && <Search/>
                }
                <div className="header__cart">
                    {
                        location.pathname !== '/cart' && (
                            <Link to="/cart" className="button button--cart">
                                <CartButton/>
                            </Link>
                        )
                    }
                </div>
            </div>
            {loading === STATUS.PENDING && <LinearProgress/>}
        </div>

    )
}