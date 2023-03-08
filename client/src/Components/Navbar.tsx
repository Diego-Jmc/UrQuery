import '../Styles/navbar.css'
import { useState } from 'react'
import InfoPopUp from './InfoPopUp'


export default function Navbar(){

    const [popUp,setPopUp] = useState(false)


    return (
        <div className="nav_container">
        <h2 className="logo_header">UrQuery</h2>
        <button onClick={()=>setPopUp(true)} className='about_tag'>About</button>
        <InfoPopUp trigger = {popUp} setPopUp = {setPopUp}/>

    </div>

    )

}