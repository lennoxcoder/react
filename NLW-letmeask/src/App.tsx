import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {createContext, useEffect, useState} from 'react';
import { auth, firebase } from './services/firebase';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';



type User = {
    id:string;
    name:string | null;
    avatar:string | null;    
}


type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);


export default function App() {

    const [user, setUser] = useState<User>();


    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user=>{
            if(user) {
                const {displayName, photoURL, uid} = user

                setUser({
                    id:uid,
                    name: displayName,
                    avatar: photoURL
                })   
            }                 
        })

        return () => {
            unsubscribe();
        }

    }, [])


    
    async function signInWithGoogle() {

        const provider = new firebase.auth.GoogleAuthProvider(); 
        const result = await auth.signInWithPopup(provider);

        if(result.user) {
            const {displayName, photoURL, uid} = result.user;
            setUser({
                id:uid,
                name: displayName,
                avatar: photoURL
            })            
        }        
          
    }



    return (
        <BrowserRouter>
                <AuthContext.Provider value={{user, signInWithGoogle}}>
                <Switch>                
                    <Route path="/" exact component={Home}/>
                    <Route path="/rooms/new" component={NewRoom}/>
                    <Route path="/rooms/:id" component={Room}/>
                    <Route path="/admin/rooms/:id" component={AdminRoom}/>

                </Switch>

            </AuthContext.Provider>
        </BrowserRouter>
    )
                    
}