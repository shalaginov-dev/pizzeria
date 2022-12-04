
export function Categories({value, onSelectCategoryClick}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']



    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, index) => (
                        <li
                            key={index}
                            onClick={() => {onSelectCategoryClick(index)}}
                            className={value === index ? 'active' : ''}>{categoryName}</li>
                    ))
                }
            </ul>
        </div>

    )
}