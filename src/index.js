import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import Index from './AppRoute/RouteManager';
import './index.css'
import './App.css'

ReactDOM.render(
    <BrowserRouter>
        <Index />
    </BrowserRouter>
, document.getElementById('root'))
