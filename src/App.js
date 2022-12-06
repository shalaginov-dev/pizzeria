import './scss/app.scss'
import {Routes, Navigate, Route} from 'react-router-dom';

import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import {NotFound} from "./pages/NotFound";


export function App() {

    return (
        <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/404" element={<NotFound/>}/>
                        <Route path="*" element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </div>
        </div>
    );
}

