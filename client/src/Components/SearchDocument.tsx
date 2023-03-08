
import axios from 'axios';
import React, { useState } from 'react';



// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar


interface Props{
    setDa:(value:string) => void
}


export default function SearchDocument({setDa}:Props){


    const [id,setId] = useState('')
    const [blankSpaceMsg,setBlankSpaceMsg] = useState(false)

    function getDocument(){

        if(id !== ''){
            axios.get(`http://localhost:8080/document/${id}`)
            .then(res => {
             if(res.status !== 204){
                const document = res.data.document
                setDa(document)
                setBlankSpaceMsg(false)     
             }else
             setBlankSpaceMsg(true)            
            })

        }else{
            setBlankSpaceMsg(true)
        }

    }

    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>){
        setId(event.target.value)
        
      }

    return (

        <div className="search-document-container">
            {blankSpaceMsg? <input onChange={handleOnChange} className="search-document-input error" type='text' placeholder="identificacion" /> :   
             <input onChange={handleOnChange} className="search-document-input" type='text' placeholder="identificacion" />}
            <button onClick={getDocument} className="search-document-button">Pedir documento</button>
        </div>

    )
}