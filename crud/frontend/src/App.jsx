import './App.css';
import Bootstrap from './bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import {HashRouter} from 'react-router-dom';

import Routes from './Routes';
import Logo from './Logo';
import Nav from './Nav';
import Footer from './Footer';

export default props =>

<HashRouter>

    <div className="app">
        <Logo/>
        <Nav/>
        <Routes/>
        <Footer/>

    </div>

</HashRouter>
