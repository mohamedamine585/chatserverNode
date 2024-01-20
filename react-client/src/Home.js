import React, { useState } from "react";
import './Home.css';
import { useNavigate  } from 'react-router-dom';
export default function Home(){
    const [roomid,setroomid] = useState(0)
    const navigate = useNavigate()

  const handleroomid = (event) =>{
    setroomid(event.target.value)

  }
    return(
        <div>
        <body>
            
            <input onChange={handleroomid}>
            </input>
           
            <button onClick={()=>{ navigate(`/chat/${roomid}`)}}>
                Go to chatroom
            </button>
            </body>
      
      </div>
   
   
    );
}