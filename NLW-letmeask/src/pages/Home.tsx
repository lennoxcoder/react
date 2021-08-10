import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleLogo from '../assets/images/google-icon.svg';
import '../styles/home.scss';
import { Button } from '../components/Button';
import {useHistory} from 'react-router-dom';
import {FormEvent, useContext} from 'react';
import {AuthContext} from '../App';
import { useState } from 'react';
import {database} from '../services/firebase';


export default function Home() {

    const history = useHistory();
    const {user, signInWithGoogle} = useContext(AuthContext);
    const [roomCode, setRoomCode] = useState('');

    async function buttonGoogleEventHandler() {

        if(!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');      
    }


    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();
        if(roomCode.trim()==='') return;

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);

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
              
                    <p>{user?.name}</p>
                    
                    <button onClick={buttonGoogleEventHandler} className="red-btn-google">
                        <img src={googleLogo} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className="center-ymargin"> Ou entre em uma sala</div>


                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder = "Digite o codigo da sala"  
                            onChange={event=> setRoomCode(event.target.value)}
                            value={roomCode}                      
                        />
                        <Button type="submit">Entrar na sala</Button>
                        
                    </form>

                </div>

            </main>


        </div>
    )
}