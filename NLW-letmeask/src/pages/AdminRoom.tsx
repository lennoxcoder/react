import {useHistory, useParams} from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg';
import { Button } from '../components/Button'
import { Question } from './Question';
import { RoomCode } from '../components/RoomCode';
//import {AuthContext} from '../App';
import {useRoom} from '../components/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';


type roomParams = {
    id:string;
}

export function AdminRoom() {

    //const {user} = useContext(AuthContext);
    const params = useParams<roomParams>();
    const roomId = params.id; 
    const {title, questions} = useRoom(roomId);
    const history = useHistory();
   

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt:new Date(),
        })
        history.push('/');
    }


    async function handleDeleteQuestion(questionId:string) {
        // if (window.confirm('Deseja excluir esta pergunta?')) {
        //     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        // }

        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }

    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logo} alt="" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}                    
                </div>

                


                <div className="question-list">
                    {questions.map(question=> {
                        return(
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >

                                <button 
                                    type="button" 
                                    onClick={()=> {handleDeleteQuestion(question.id)}}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>    
                        )
                    })}
                </div>            


            </main>
        </div>
    )
}