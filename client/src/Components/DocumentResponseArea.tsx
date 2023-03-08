
import '../Styles/searchScript.css'

interface Props{
    raValue:string
    handleSetRa:(value:string)=>void
    setPopUp:(value:boolean) => void
}

export default function DocumentResponseArea({raValue,handleSetRa,setPopUp}:Props) {




    function handleClearOnClick(){
        handleSetRa('')
    }


    function openPopUp(){
        setPopUp(true)
    }



    return (
        <div className="textual_RA_container">

            <div className="RA_header">
                <h2 className="description__RA"> Output (RA) </h2>
            </div>

            {raValue === 'Error de compilacion'?  <textarea className="text_RA compilation-err" readOnly value={raValue} ></textarea> : <textarea className="text_RA" readOnly value={raValue} ></textarea>}
           
            <div>
                <button onClick={handleClearOnClick} className="clear-btn">Clear</button>
                {raValue.toString().trim()!==''?<button onClick={openPopUp} className="save-script-btn">Guardar Script</button>:<></>}
            </div>



        </div>
    )
}