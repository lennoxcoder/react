import Header from '../components/Header';
import { Context } from '../App';
import React from 'react';
import '../styles/items.scss';
import { getFireBaseData, deleteUser } from '../firebase';
import { useState, useEffect, useRef, useContext } from 'react';

export default function Admin() {

    // The useRef Hook allows you to persist values between renders.
    var isReady = useRef(false);

    const [data, setData] = useState('');
    const [msg, setMsg] = useState('Carregando...');
    const { admin } = useContext(Context);



    // useEffect runs after the rendering/re-rendering of the component 
    // but only if any of the dependencies is changed. 
    // Remember it runs after the component is rendered(or mounted) not before, 
    // not along with but only after the component is rendered.

    useEffect(() => {

       getFireBaseData().then(
            (fireBaseData) => {
                isReady.current = true;
                setData(fireBaseData);
            }).catch(err => {
                isReady.current = false;
                setData('null');
                setMsg(err);
            })
    }, [data])



    if (!admin) {
        return (
            <div>
                Pagina nao encontrada.
            </div>)
    }



    // =====================================
    //      DELETE BUTTON EVENT HANDLER
    // =====================================

    function btnDelete(e) {
        
        e.preventDefault();
        if(!isReady.current) {
            setData('null');
            setMsg('Erro.');
            return;
        }

        var strCel2purge = e.target.id;
        deleteUser(strCel2purge).then(() => {
            getFireBaseData().then((fireBaseData) => { setData(fireBaseData) })
        }).catch(err => {
            isReady.current = false;
            setData('null');
            setMsg(err);
        })

    }




    // The render need to wait fetch data 
    if (isReady.current && data && (data !== "null") && (data !== "undefined")) {

            return (

                <div>
                    <Header />
                    <div>

                        <ol type="1">

                            {data.map(oJson =>
                                <li key={oJson.CellNumber}>

                                    {oJson.Name + ' ' + oJson.CellNumber + ' ' + oJson.Address}
                                    <button id={oJson.CellNumber} onClick={btnDelete} >Deletar</button>

                                </li>
                            )}

                        </ol>



                    </div>
                </div>
            )
        

    } else {



        return (

            <div>
                {msg}
            </div>

        ) // return



    }

}





