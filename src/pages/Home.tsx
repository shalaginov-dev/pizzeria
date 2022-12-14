import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../@types/hooks";
import qs from 'qs'

import {Categories} from "../components/Categories";
import {SortPopup, sortList} from "../components/SortPopup";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";
import {SetFilter, Sort} from "../@types/redux/filter";

export function Home() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, currentPage, sort, searchValue} = useAppSelector(state => state.filter)
    const {items, status} = useAppSelector(state => state.pizza)
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
            const params = qs.parse(window.location.search.substring(1)) as any
            console.log(params)
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            console.log(sort)
            dispatch(setFilters({
                searchValue: params.searchValue,
                categoryId: params.categoryId,
                currentPage: params.currentPage,
                sort:  sort || sortList[0]
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
    const pizzas = items.map((p: any) => (<PizzaBlock key={p.id} {...p}/>))

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId}/>
                <SortPopup/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    <div className="content__error-info">
                        <h2>Произошла ошибка</h2>
                        <p>Не удалось получить пиццы, повторите попытку позже...</p>
                    </div>
                    : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>

            }
            <Pagination currentPage={currentPage}/>
        </div>
    )
}