import { Button } from "../components/Button";
import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import '../styles/home.scss';
import { useContext } from "react";
import { AuthContext } from "../App";
import {FormEvent, useState} from 'react';
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";



export default function NewRoom() {

    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    
    // ======================================================
    // INSERÇÃO (PUSH) DE UMA NOVA ROOM NO FIREBASE
    async function formEventHandlerNewRoom(event:FormEvent) {
        event.preventDefault();
        if(newRoom.trim()==='') return;
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId:user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div className="home">
            <aside>
                <img src={illustration} alt=''/>
                <strong>Crie salas ao vivo.</strong>
                <p>Tire as suas dúvidas em tempo real.</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logo} alt=''/>

                    <h1>{user?.name}</h1>
                    <p>Room {newRoom}</p>
                    
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={formEventHandlerNewRoom}>
                        <input
                            type="text"
                            placeholder = "Nome da sala"  
                            onChange={event => setNewRoom(event.target.value)}                      
                        />
                        <Button type="submit">Criar sala</Button>                        
                    </form>

                    <p>
                        Quer entrar em uma sala já existente ? 
                        <a href="/">clique aqui</a>
                    </p>

                </div>
            </main>


        </div>
    )
}