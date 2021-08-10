import { useEffect, useState } from "react";
import { database } from "../services/firebase";



type FireBaseQuestions = Record<string, {
    author:{
        name:string;
        avatar: string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type QuestionType = {
    id:string;
    author:{
        name:string;
        avatar: string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount:number;
}



export function useRoom(roomId:string) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        // roomRef.once roda apenas uma vez, 
        //      se uma nova pergunta for adicionada, ela nao será atualizada
        // roomRef.on roda para qualquer alteracao em room, entao caso eu
        //        tenha 500 perguntas, ficara muito lento.

        roomRef.on('value', room =>{
           const databaseRoom = room.val();
           const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};
           const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id:key,
                    content:value.content,
                    author:value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length, 
                }
           })

           setTitle(databaseRoom.title);
           setQuestions(parsedQuestions);

        })

        return () => {
            roomRef.off('value');
        }

    }, [roomId]);

    return { questions, title }
   
}