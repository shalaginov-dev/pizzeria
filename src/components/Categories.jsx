
export function Categories({value, setSelectCategory}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']



    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, index) => (
                        <li
                            key={index}
                            onClick={() => {setSelectCategory(index)}}
                            className={value === index ? 'active' : ''}>{categoryName}</li>
                    ))
                }
            </ul>
        </div>

    )
}