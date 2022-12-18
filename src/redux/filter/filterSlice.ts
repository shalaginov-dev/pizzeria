import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Filter, SORT_PROPERTY, Sort, SetFilterArgs} from "./filter-types";

const initialState: Filter = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: SORT_PROPERTY.RATING_DESC
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<SetFilterArgs>) {
            if (Object.keys(action.payload).length) {
                state.searchValue = action.payload.searchValue
                state.categoryId = Number(action.payload.categoryId)
                state.currentPage = Number(action.payload.currentPage)
                state.sort = action.payload.sort
            } else {
                state.categoryId = 0
                state.currentPage = 1
                state.sort = {
                    name: 'популярности',
                    sortProperty: SORT_PROPERTY.RATING_DESC
                }
            }

        },
    },
})

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer