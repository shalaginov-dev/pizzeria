import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
import {setCurrentPage} from "../../redux/filter/filterSlice";
import {useAppDispatch} from "../../redux/hooks";

interface PaginationProps {
    currentPage: number
}

export function Pagination({currentPage}: PaginationProps) {
    const dispatch = useAppDispatch()

    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => {
                dispatch(setCurrentPage(event.selected + 1))
            }}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    )
}