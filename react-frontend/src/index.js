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
//  - https://blog.openreplay.com/the-transition-from-higher-order-component-pattern-to-react-hooks-pattern
//  - panel admina
//  - panel prowadzacego
//  - https://github.com/bottega-code-school/prop-management/blob/master/src/reducers/authReducer.js
//  - edytowanie profilu (?)
//  - dodanie logiki zasubskrybowania lekcji
//  - ADD RESOURCE tylko w momencie edytowania lekcji
//  - LessonDetails może uprościć i wyciagnac do 1 komponentu (?HOC?)
//  - EDIT Lesson
