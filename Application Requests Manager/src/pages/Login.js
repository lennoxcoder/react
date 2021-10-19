
import '../styles/form.scss';
import Header from "../components/Header";
import { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { useHistory } from 'react-router-dom';
import { getFireBaseData, setFireBaseData } from '../firebase';
import { getStringDate } from '../tools';


export default function Login() {

    const history = useHistory();
    const { data, setData, setAdmin } = useContext(Context);
    const [Name, setName] = useState(data.Name);
    const [CellNumber, setCellNumber] = useState(data.CellNumber);


    function hideAlert() {
        document.getElementById('popup').style.display = "none";
    }

    useEffect(() => {
        hideAlert();
    }, [])


    function popup(msg) {
        document.getElementById('popup').innerHTML = msg;
        document.getElementById('popup').style.display = "flex";
    }




    // Values entered yes or not (1 / 0)
    // Name Cell Exists?  What to do:
    //   0   0      0       return
    //   0   0      1       return
    //   1   0      0       return
    //   1   0      1       return
    //   0   1      0       Creates a random name 
    //   0   1      1       Creates a random name and overwrite database. 
    //   1   1      0       New register
    //   1   1      1       Allow name changing in login


    function btnEnterEventHandler(event) {

        event.preventDefault();

        
        if (CellNumber === '') {
            popup('Necessario celular para login');
            return;
        }

        // Mobile phone number size verification   
        let ddd = parseInt(CellNumber.slice(0,2)) >= 11 
        if (!ddd && (CellNumber.length !== 11 )) {
            popup('Celular deve incluir DDD e ter 11 digitos.');
            return;
        }


        // New user with a auto generated name
        var tempName='';
        if ((Name === '') && (CellNumber !== ''))  {
            tempName='user' + getStringDate();
        } else {
            tempName=Name;
        }
       
        
        
        // Reading and getting all data
        getFireBaseData().then((fireBaseData) => {

            var oJsonData = fireBaseData.find(oJson => oJson.CellNumber === CellNumber);


            if (typeof (oJsonData) === 'undefined') {

                // ========================
                //      NEW REGISTER
                // ========================                                
                
                setFireBaseData(CellNumber, tempName, '')
                    .then(() => {
                        oJsonData = {
                            CellNumber,
                            Name:tempName,
                            "Address": 'ND'
                        }
                        localStorage.setItem("data", JSON.stringify(oJsonData));
                        setData(oJsonData);
                        history.push('/items');
                    })
                    .catch(err => { console.log(err) });


            } else {

                // =====================
                // User is resgistered
                // =====================

                localStorage.setItem("data", JSON.stringify(oJsonData));
                setData(oJsonData);
                history.push('/items');
            }



        }).catch(err => {    // catch do getFireBaseData


            if (err === 'No Firebase data') {

                setFireBaseData(CellNumber, tempName, '')
                    .then(() => {
                        var oJsonData = {
                            CellNumber,
                            Name:tempName,
                            "Address": ''
                        }
                        localStorage.setItem("data", JSON.stringify(oJsonData));
                        setData(oJsonData);
                        history.push('/items');
                    })
                    .catch(err => { console.log(err) });


            } else {
                popup('Erro interno.');

            }
        })

    }








    return (
        <div className="main">
            <Header />

            <div className="boxframe">
                <form>
                    <label>Nome:</label>
                    <input
                        contentEditable="true"
                        type="text"
                        value={Name}
                        onChange={e => {
                            setName(e.target.value);
                            hideAlert();
                        }}

                    />
                    <label>Celular:</label>
                    <input
                        contentEditable="true"
                        type="text"
                        value={CellNumber}
                        onChange={e => {
                            setCellNumber(e.target.value);
                            hideAlert();
                        }}
                     />

                    <button
                        type="submit"
                        onClick={btnEnterEventHandler}>

                        Entrar

                    </button>
                </form>
            </div>



            <div id='popup' className='popupwindow'></div>


        </div>
    )

}
