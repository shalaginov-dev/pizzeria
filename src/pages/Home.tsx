import {useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom"
import qs from 'qs'

import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setFilters} from "../redux/filter/filterSlice";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import {ParseParams} from "../redux/filter/filterTypes";
import {sortList} from "../components";
import {Categories, SortPopup, Skeleton, PizzaBlock, Pagination} from '../components'
import {STATUS} from "../redux/pizza/pizzaTypes";
import {CartButton} from "../components/Buttons/CartButton";

function Home() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, currentPage, sort, searchValue} = useAppSelector(state => state.filter)
    const {items, loading} = useAppSelector(state => state.pizza)

    const getPizzas = () => {

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

        dispatch(fetchPizzas({
                currentPage,
                sortBy,
                order,
                category,
                search
            })
        )
        window.scrollTo(0, 0)
    }

    //Если был первый рендер и изменились параметры вмонтируем их в адресную строку
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId: categoryId > 0 ? categoryId : null,
                currentPage,
            }, {skipNulls: true})

            navigate(`/?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort, currentPage])

    //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as ParseParams
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                searchValue: params.searchValue,
                categoryId: params.categoryId,
                currentPage: params.currentPage,
                sort: sort || sortList[0]
            }))
            isSearch.current = true
        }
    }, [])

    //Если это первый рендер, то запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, currentPage, searchValue])


    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((p) => (<PizzaBlock key={p.id} {...p}/>))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId}/>
                <SortPopup sort={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                loading === STATUS.FAILED ?
                    <div className="content__error-info">
                        <h2>Произошла ошибка</h2>
                        <p>Не удалось получить пиццы, повторите попытку позже...</p>
                    </div>
                    : <div className="content__items">{loading === STATUS.PENDING ? skeletons : pizzas}</div>
            }
            <div className="footer">
                <Link to="/cart" className="button button--cart">
                    <CartButton/>
                </Link>
                <Pagination currentPage={currentPage}/>
            </div>
        </div>
    )
}

export default Home