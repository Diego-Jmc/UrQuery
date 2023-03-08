import '../Styles/infoPopUp.css'
import { useEffect, useState } from 'react';


interface member{
    name:string,
    id:number,
}



interface courseInfo{
    members?:member[],
    semester?:string,
    course?:string,
}


interface Props {
  trigger:boolean,
  setPopUp:(value:boolean)=> void  
}


export default function InfoPopUp({trigger,setPopUp}:Props){


    let startingObj:courseInfo = {} 

    const [membersInfo, setMembersInfo] = useState(startingObj)


    async function getData() {
        fetch('http://localhost:8080/about').then(response => response.json()).then(data => setMembersInfo(data))
    
      }


      useEffect(() => {
        getData()
      }, [])
    
    

    return (
        trigger ? <div className="info_window">
        <div className="info_pop-up">
          <img src={require('../images/UnaLogo.jpg')} alt="una"></img>
          <div className='info-box'>
            <h2>Integrantes:</h2>
  
            <ul>
              {
                membersInfo.members?.map(e => <li>{e.name} <span className='id-studen'> {e.id} </span></li>)
              }
            </ul>
            <p>{membersInfo.course}</p>
            <p>{membersInfo.semester}</p>
            <button onClick={() => setPopUp(false)}>Cerrar</button>
          </div>
        </div>
  
      </div> : <></>


    )
}