import {useContext, useEffect, useState} from "react";

import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";

export function Home() {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const {searchValue} = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const setSelectCategory = (index) => {
        dispatch(setCategoryId(index))
    }
    const setSelectSortType = (index) => {
        setSortType(index)
    }
    const setSelectCurrentPage = (index) => {
        setCurrentPage(index)
    }

    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = filter.categoryId > 0 ? `category=${filter.categoryId}` : ''

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://637a27eb7419b414df9b01cf.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
        )
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [filter.categoryId, sortType, searchValue, currentPage])

    const pizzas = items
        .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(p => (<PizzaBlock key={p.id}{...p}/>))

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={filter.categoryId} setSelectCategory={setSelectCategory}/>
                <Sort value={sortType} setSelectSortType={setSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzas
                }
            </div>
            <Pagination setSelectCurrentPage={setSelectCurrentPage}/>
        </div>
    )
}