import {ChangeEvent, useCallback, useRef, useState} from "react";
import debounce from 'lodash.debounce'

import s from './Search.module.scss'
import {setSearchValue} from "../../redux/filter/filterSlice";
import {useAppDispatch} from "../../redux/hooks";

export function Search() {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClickClearInput = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 500), []
    )
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        updateSearchValue(event.currentTarget.value)
    }

    return (
        <div className={s.root}>
            <svg className={s.searchIcon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
                <path d="M0 0h48v48H0z" fill="none"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => handleChangeInput(e)}
                className={s.input}
                placeholder='Поиск пиццы ...'
            />
            {
                value &&
                <svg onClick={handleClickClearInput} className={s.clearIcon} height="48" viewBox="0 0 48 48"
                     width="48"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                    <path d="M0 0h48v48h-48z" fill="none"/>
                </svg>

            }
        </div>
    )
}