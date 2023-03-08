import { useState } from "react"


interface Props{

    daContent:string,
    handleSetDa:(value:string)=>void
    handleTrigger:(value:boolean)=>void

 }


export default function DocumentTextualArea({daContent,handleSetDa,handleTrigger}:Props){


    const [wsDa,setWsDa] = useState(false)
    
    function handleOpenSaveDocumentPopUp(){
        if(daContent.trim()!=='')
            handleTrigger(true)
        else
            setWsDa(true)

            setTimeout(() => {
                setWsDa(false)
              },2000)
              

    }

    function handleOnChange(event:React.ChangeEvent<HTMLTextAreaElement>){
        handleSetDa(event.target.value)
    }

    function handleClearOnClick(){
        handleSetDa('')
    }

    return (
        <div className="textual_DA_container">

            <div className="DA_header">
                <h2 className="description__DA"> Data (DA) </h2>
            </div>

            <textarea className="text_DA" onChange={handleOnChange} value={daContent}>

            </textarea>

            <div><button onClick={handleClearOnClick} className="clear-btn">Clear</button>
            <button onClick={handleOpenSaveDocumentPopUp} className="save-document-btn">Guardar Documento</button>
            </div>

            {wsDa?  <p className="ws-da-err">Debe escribir algo en DA!</p> :  <p className="err">Debe escribir algo en DA!</p> }

        </div>
    )
}