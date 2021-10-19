import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Items from './pages/Items';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import {createContext, useState} from 'react';

export const Context = createContext();


export default function App() {
            
    let storage =  localStorage.getItem("data");
    if(!storage) { 
        storage = {Name:'', CellNumber:'', Address:'', Requests:''};
    } else {
        storage = JSON.parse(storage);
    }            

    const [data, setData] = useState(storage);        
    const [admin, setAdmin] = useState(false); 
    
   
    return (
        <BrowserRouter>
        <Context.Provider value={{data, setData, admin, setAdmin}}>
        <Switch>                
            <Route path="/" exact component={Login}/>
            <Route path="/register" component={Cadastro}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/items" component={Items}/>  
            <Route path="/logout" component={Logout}/>                        
        </Switch>
        </Context.Provider>
        </BrowserRouter>
    )
}

