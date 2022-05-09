import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter} from "react-router-dom";
import App from "./App";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));


// FIXME:
//  - rejestracja uzytkownika
//  - panel studenta
//  - panel admina
//  - panel prowadzacego
//  - dodwania lekcji
//  - dodwania resourcu
//  - dodwanaie lekcji i resource
//  - https://github.com/bottega-code-school/prop-management/blob/master/src/reducers/authReducer.js