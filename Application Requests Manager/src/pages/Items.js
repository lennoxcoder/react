import Header from '../components/Header';
import React from 'react';
import segunda from '../images/segunda.png';
import terca from '../images/terca.png';
import quarta from '../images/quarta.png';
import quinta from '../images/quinta.png';
import sexta from '../images/sexta.png';



import '../styles/items.scss';

import {Context} from '../App';
import {useContext, useState} from 'react';




export default function Items() {

    const {data, setData} = useContext(Context);
    const [Requests, setRequests] = useState(data.Requests);


    function btnUpdateEventHandler(event) {        
        event.preventDefault();   
        var loginData = {...data, Requests};
        localStorage.setItem("data", JSON.stringify(loginData));
        setData(loginData);         
    }


    // ============= INVALID DAY ============= 

    var dayNumber = (new Date()).getDay();
    //seg-sex: 1-5
    if((dayNumber<1) || (dayNumber>5)) {

        return (
            <div>
                <Header/>
                <h1>Hoje estamos fechados.</h1>
            </div>
        )
    }
    dayNumber = dayNumber-1;
    dayNumber = 2


    // ============= VALID DAY ============= 

    var weekDay=["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
    var dayLunch= [segunda, terca, quarta, quinta, sexta];
    var lunch=["Arroz, Feijão e Frango", "Estrogonofe de frango", "Arroz, Feijão e Frango", "Frango com Quiabo", "Feijoada"];
    lunch = lunch[dayNumber];
    var day = weekDay[dayNumber];

    return (
        <div>
            <Header/>
            <h1>{day}</h1>
            <div className='items'>
                
                <img src={dayLunch[dayNumber]} alt="" />
                
                <div>
                    <p>{lunch}</p>                    
                    <p>{data.Name}</p>
                    <p>{data.CellNumber}</p>
                    <p>{data.Address}</p>        
                    <textarea 
                        rows="4" cols="20" autoFocus 
                        value={Requests}
                        onChange={e => setRequests(e.target.value)}>                            
                    </textarea>                   
            
                </div>                
               
                <div>
                    <button onClick={btnUpdateEventHandler}>Atualizar</button>
                </div>


            </div>
        </div>
    )
}





