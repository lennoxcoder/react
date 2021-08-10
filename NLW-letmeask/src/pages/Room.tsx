import { useState, useContext, FormEvent } from 'react';
import {useParams} from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import like from '../assets/images/like.svg'
import { RoomCode } from '../components/RoomCode';
import {AuthContext} from '../App';
import '../styles/room.scss';
import { database } from '../services/firebase';
import { Question } from './Question';
import {useRoom} from '../components/useRoom';



type roomParams = {
    id:string;
}

export function Room() {

    const {user} = useContext(AuthContext);
    const params = useParams<roomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id; 
    const {title, questions} = useRoom(roomId);
   
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if(newQuestion.trim()==='') return;
        if(!user) throw new Error('You must be logged in.');

        const question = {
            content: newQuestion,
            author: {
                name:user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        
        
        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');
    }
    
    async function handleSendLike(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId:user?.id
            })

    }






    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logo} alt="" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&  <span>{questions.length} pergunta(s)</span>}                    
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que voce quer perguntar ?"
                        onChange={event=> setNewQuestion(event.target.value)}
                        value={newQuestion}  
                    />
                    <div>

                        { user ? (
                                    <div className='user-info'>
                                        <span>{user.name}</span>    
                                    </div>
                                ) : (

                                    <span>Para enviar uma pergunta, <button>faça seu login.</button></span>

                                )
                        }


                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>



                <div className="question-list">
                    {questions.map(question=> {
                        return(
                           
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}>
                                    <button 
                                        className="like-button" 
                                        type="button"
                                        aria-label="Marcar como gostei"
                                        onClick={() => handleSendLike(question.id)}
                                    > 

                                        {question.likeCount > 0 && <span>{question.likeCount}</span>}
                                        <img src={like} alt="" />
                                        
                                    </button>
                                </Question>

                        )
                    })}
                </div>            


            </main>
        </div>
    )
}