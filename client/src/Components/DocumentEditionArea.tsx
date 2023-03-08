import axios from "axios";



interface Props{
    ea:string,
    ra:string,
    setRa:(value:string) => void,
    handleSetEa:(value:string)=> void,
    empty:(value:boolean)=>void
}


export default function DocumentEditionArea({ea,ra,setRa, handleSetEa,empty}:Props){


    function handleOnChange(event:React.ChangeEvent<HTMLTextAreaElement>) {
        handleSetEa(event.target.value)
        empty(false)
    }

    function handleClearOnClick(){
        if(ra.trim()!=='')
        setRa('')
        handleSetEa('')
    }


    function compile(){
        if(ea.trim()!==''){
            axios.post('http://localhost:8080/compile', {
                script:ea
              })
              .then(response=> {

                if(response.data?.code === 500){
                    setRa('Error de compilacion')
                }else{
                    setRa(response.data)
                }
              

              })
              .catch(error => console.log(error) 
              )
              empty(false)
        }else{
        empty(true)

    
        }

    }


    return (
        <div className="textual_EA_container">

            <div className="EA_header">
                <h2 className="description__EA"> Script (EA) </h2>
                <button onClick={compile}>Compile</button>
            </div>
            <textarea onChange={handleOnChange} className="text_EA"  value={ea}>
            </textarea>

            <div>
                <button onClick={handleClearOnClick} className="clear-btn">Clear</button>
            
            </div>
       

        </div>
    )


}