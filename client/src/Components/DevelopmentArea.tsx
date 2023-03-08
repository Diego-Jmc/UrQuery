
import '../Styles/developmentArea.css'
import '../Styles/DA.css'
import '../Styles/RA.css'
import '../Styles/EA.css'
import '../Styles/searchDocument.css'
import { useState } from "react";
import DocumentEditionArea from './DocumentEditionArea'
import DocumentTextualArea from './DocumentTextualArea'
import DocumentResponseArea from './DocumentResponseArea'
import SearchDocument from './SearchDocument'
import SaveDocumentPopUp from './SaveDocumentPopUp'
import SearchScript from './SearchScript'
import SaveScriptPopUp from './SaveScriptPopUp'

export default function DevelopmentArea(){

    const [da,setDa] = useState('')
    const [ea,setEa] = useState('')
    const [ra,setRa] = useState('')
    const [docTrigger,setDocTrigger] = useState(false)
    const [scriptTrigger,setScriptTrigger] = useState(false)


    const [noContentError,setNoContentError] = useState(false)
 

    function handleSetDa(content:string){
        setDa(content)
    }

    function handleSetRa(content:string){
        setRa(content)
    }


    function verify(daField:string,eaField:string){
     return  ((daField.trim() === '' && eaField.trim() === '') || (daField.trim() !== '' && eaField.trim() !== ''))? false : true
    }

    return (
          
        <div className="container">
            <div className="text_editing">

              {verify(da,ea)?<div className='warning-msg'><p>Warning! Revise si hay datos asociados</p></div>:""}
              {noContentError?<div className='warning-msg'><p>No hay un script para compilar!</p></div>:""}

                <div className='documents'>
                <DocumentEditionArea ea={ea} setRa={setRa} handleSetEa={setEa} empty={setNoContentError} ra={ra}  />
                <DocumentTextualArea  handleSetDa={setDa} daContent={da} handleTrigger={setDocTrigger} />
                <DocumentResponseArea raValue={ra} handleSetRa={handleSetRa} setPopUp={setScriptTrigger}/>
                </div>

                <div className='search-bars'>
                <SearchDocument setDa={handleSetDa}/>
                <SearchScript setEa={setEa} setRa={setRa}/>
                </div>

                <SaveDocumentPopUp trigger = {docTrigger} setPopUp={setDocTrigger}  da={da} />
                <SaveScriptPopUp trigger= {scriptTrigger} ra={ra} ea={ea} closePopUp={setScriptTrigger} />
            </div>


        </div>
    )
}