import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../redux/slices/filterSlice";

export function Pagination({currentPage}) {
    const dispatch = useDispatch()

    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => {dispatch(setCurrentPage(event.selected + 1))}}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    )
}