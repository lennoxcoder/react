import Header from "../components/Header";
import '../styles/form.scss';
import { Context } from '../App';
import { useContext, useState, useRef } from "react";
import { setFireBaseData } from '../firebase';
import { useHistory } from 'react-router-dom';





export default function Cadastro() {

    const { data, setData } = useContext(Context);
    const [Address, setAddress] = useState(data.Address);
    const [clicked, setClicked] = useState(false);
    const [msg, setMsg] = useState('');
    const [btnAction, SetBtnAction] = useState('Atualizar');
    var isReady = useRef(false);
    const history = useHistory();

    let storage = localStorage.getItem("data");
    if (storage) isReady.current = true;


    // Button Update
    function updateData(e) {

        e.preventDefault();

        if (btnAction === 'Atualizar') {

            var loginData = { Name: data.Name, CellNumber: data.CellNumber, Address, Requests: data.Requests };
            localStorage.setItem("data", JSON.stringify(loginData));
            setData(loginData);
            alert('Aguarde');
            setFireBaseData(data.CellNumber, data.Name, Address)
                .then(() => {
                    setClicked(true);
                    setMsg('Atualizado');
                    SetBtnAction('Voltar');
                })
                .catch(err => setMsg(err));

        } else {

            // Back action
            history.push('/items');

        }




    }



    if (isReady.current) {

        return (
            <div className="main">

                <Header />

                <div className="boxframe">
                    <form>
                        <label>Nome:</label>
                        <input className='readonly' type="text" value={data.Name} readOnly />
                        <label>Celular</label>
                        <input className='readonly' type="text" value={data.CellNumber} readOnly />
                        <label>Endereço</label>
                        <input type="text" value={Address} onChange={e => { setAddress(e.target.value) }} />
                        <button onClick={updateData}>{btnAction}</button>
                    </form>

                    {clicked &&
                        <div className="popupwindow">
                            {clicked && <h1>{msg}</h1>}
                        </div>
                    }


                </div>


            </div>
        )

    } else {

        return (
            <div>Nao ha usuario logado.</div>
        )
    }



}