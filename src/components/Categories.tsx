import {memo} from "react";
import {useAppDispatch} from "../redux/hooks";
import {setCategoryId} from "../redux/filter/filterSlice";

interface CategoriesProps {
    categoryId: number
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories = memo(({categoryId}: CategoriesProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                dispatch(setCategoryId(index))
                            }}
                            className={categoryId === index ? 'active' : ''}>{categoryName}</li>
                    ))
                }
            </ul>
        </div>

    )
})