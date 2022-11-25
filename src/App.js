import './scss/app.scss'
import {Routes, Navigate, Route} from 'react-router-dom';
import {createContext, useState} from "react";

import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import {NotFound} from "./pages/NotFound";

export const SearchContext = createContext()

export function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/404" element={<NotFound/>}/>
                        <Route path="*" element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

