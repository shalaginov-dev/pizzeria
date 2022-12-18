export interface Filter {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: Sort
}

export enum SORT_PROPERTY {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',

    TITLE_DESC = 'title',
    TITLE_ASC = '-title',

    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export interface Sort {
    name: string
    sortProperty: SORT_PROPERTY
}

export interface SetFilterArgs {
    searchValue: string
    categoryId: string
    currentPage: string
    sort: Sort
}

export interface ParseParams {
    searchValue: string
    categoryId: string
    currentPage: string
    sortProperty: string
}