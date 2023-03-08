

import axios from 'axios'
import { useState } from 'react'


import '../Styles/saveScript.css'

interface props {
    trigger: boolean,
    ra:string,
    ea:string,
    closePopUp:(value:boolean)=>void
}


export default function SaveScriptPopUp({trigger,ra,ea,closePopUp}:props){


    const [scriptName,setScriptName] = useState('')
    const [ws,setWs] = useState(false)
    const [sucess,setSucess] = useState(false)
    const [fail,setFail] = useState(false)

    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>){
        setScriptName(event.target.value)

    }

    function close(){
        closePopUp(false)
    }


    function saveScript(){

        if(scriptName.trim() === ''){
            setWs(true)
            setTimeout(()=>{
                setWs(false)
                close()
            },1)
        }else{
                        
            axios.post('http://localhost:8080/query', {  queryName: scriptName, queryText: ea ,resultText: ra})
                .then(function (response) {
                    if (response.status !== 204){
                        setSucess(true)
                        setTimeout(() => {
                         setSucess(false)
                          },2000)  
                     }                          
                    else{
                        setFail(true)
                        setTimeout(()=>{
                            setFail(false)
                        },2000)   
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
      
        }
            

    }


    return (

        trigger?     <div className="save-script-window">

        <div className="save-script-pop-up">

            <label htmlFor="">Escriba el nombre que le quiere dar</label>
            
                {ws? <input onChange={handleOnChange} type="text" className='ws-err' />: <input onChange={handleOnChange} type="text" />}

                <div className='btn-container'>
                <button  onClick={saveScript} className='save-btn'>Guardar</button>
                <button onClick={close} className='cancel-btn'>Cancelar</button>

            </div>

            <div className='msg'>
                {sucess? <p className='sucess'>Guardado con éxito</p> : <></>}
                {fail? <p className='ws'>Ya existe un script con ese nombre</p> : <></> }
    
            </div>


        </div>
        
    </div>
    : <></>


    
    )


}