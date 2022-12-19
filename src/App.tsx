import {lazy, Suspense} from "react";
import {Routes, Route} from 'react-router-dom';
import './scss/app.scss'

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Preloader2 from "./components/Preloader/Preloader2";

const Cart = lazy(() => import( /* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
const SinglePizza = lazy(() => import(/* webpackChunkName: "SinglePizza" */ './pages/SinglePizza'))

export function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={<Suspense fallback={<Preloader2/>}><Cart/></Suspense>}/>
                <Route path="pizza/:id" element={<Suspense><SinglePizza/></Suspense>}/>
                <Route path="*" element={<Suspense fallback={<Preloader2/>}><NotFound/></Suspense>}/>
            </Route>
        </Routes>
    );
}

// Добавить полосу загрузки