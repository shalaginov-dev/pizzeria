import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

export function Pagination({setSelectCurrentPage}) {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => {setSelectCurrentPage(event.selected + 1)}}
            pageRangeDisplayed={4}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    )
}