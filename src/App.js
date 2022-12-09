import './scss/app.scss'
import {Routes, Navigate, Route} from 'react-router-dom';

import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import {NotFound} from "./pages/NotFound";
import {SinglePizza} from "./pages/SinglePizza";
import {MainLayout} from "./layouts/MainLayout";


export function App() {

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/pizza/:id" element={<SinglePizza/>}/>
                <Route path="/404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Route>
        </Routes>
    );
}

