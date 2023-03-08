import axios from 'axios'
import { useEffect, useState } from 'react'
import '../Styles/saveDocumentPopUp.css'


interface props {
    trigger: boolean
    setPopUp: (value: boolean) => void
    da: string
}

export default function SaveDocumentPopUp({ trigger, setPopUp, da }: props) {
    let starting: any[] = []

    const [showErr, setShowErr] = useState(false)
    const [documents, setDocuments] = useState(starting)
    const [documentName, setDocumentName] = useState('')
    const [blankSpaceError, setBlankSpaceError] = useState(false)
    const [sucessMsg,setSucessMsg] = useState(false)


    function setDocumentsVar() {
        axios.get('http://localhost:8080/document').then(resp => {
            setDocuments(resp.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        setDocumentsVar()
    }, [])

 

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDocumentName(event.target.value)
    }

    function handleCancelBtn() {
        setPopUp(false)
    }

    function handleSaveDocument() {

        if(documentName.trim() === ''){
            setBlankSpaceError(true)
            setTimeout(()=>{
                setBlankSpaceError(false)
            },2000)
        }else{
            
            axios.post('http://localhost:8080/document', { documentName: documentName, documentText: da })
                .then(function (response) {
                    if (response.status !== 204){
                        setDocumentsVar()
                        setSucessMsg(true)
                        setTimeout(() => {
                            setSucessMsg(false)
                          },2000)           

                     }                          
                    else{
                        setShowErr(true)
                        setTimeout(() => {
                            setShowErr(false)
                          },2000)     
                        }
                })
                .catch(function (error) {
                    console.log(error);
                });
      
        }


    }

    return (
        trigger ?
            <div className="saveDocument-window">

                <div className="saveDocument-popUp">

                    <h3>Documentos</h3>

                    <div className='document-list'>

                        <ul>

                            {

                                documents.map(e => <div className='document-item'> {e.name} </div>)

                            }

                        </ul>

                    </div>

                    <div className='save-document-area'>

                        <label htmlFor="">Escriba el nombre</label>
                        {
                            blankSpaceError ? <input className="ws_err" type="text" onChange={handleOnChange} /> : <input type="text" onChange={handleOnChange} />
                        
                        }
         
                        <div className='save-document-btns'>
                            <button  onClick={handleSaveDocument} className='save-document-btn'>Guardar</button>
                            <button onClick={handleCancelBtn} className='cancel-save-document-btn'>Cancelar</button>
                        </div>


                        {showErr ? <p className="err-msg">Ya existe un documento con ese nombre!</p> : <></>}
                        {sucessMsg ? <p className='success'>Documento guardado en la BD</p>: <></>}

                    </div>


                </div>

            </div>
            : <></>

    )


}