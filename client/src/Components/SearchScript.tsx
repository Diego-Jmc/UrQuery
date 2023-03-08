
import axios from 'axios'
import { useState } from 'react'
import '../Styles/searchScript.css'


interface props{
    setRa:(value:string)=>void,
    setEa:(value:string)=>void
}

export default function SearchScript({setRa,setEa}:props){


    const [scriptId,setScriptId] = useState('')
    const [ws,setWs] = useState (false)

    
    function getScript(){
        if(scriptId.trim() === ''){
            setWs(true)
        }
        else{
            axios.get(`http://localhost:8080/query/${scriptId}`)
            .then(res => {
              if(res.status === 204){
                setRa('')
                setEa('No se encontro ese script')
                setWs(true)
              }else{
              const script = res.data
              setEa(script.query)
              setRa(script.result)
              setWs(false)
              }
            })

        }

    }


    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>){
        setScriptId(event.target.value)
    }




    return (

        <div className="search-script-container">

            {ws? <input onChange={handleOnChange} className='search-script-input ws-err' placeholder='indentificación'></input> : <input placeholder='indentificación' onChange={handleOnChange} className='search-script-input'></input>}
            <button onClick={getScript} className='search-script-button'>Pedir Script</button>

         </div>


    )



}