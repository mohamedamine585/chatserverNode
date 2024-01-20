import './App.css';
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function App() {
  const chatroomid = useParams();
  const roomid = chatroomid.roomid
  const [messages,setMessages] = useState([]);
  const [socket,setSocket] = useState(null)
  const [messageText, setMessageText] = useState('');
  useEffect(() => {
    const newSocket = new WebSocket(`wss://chatserver-o3ee.onrender.com/chat/${roomid}`);

    newSocket.addEventListener('open', (event) => {
      console.log("Connection opened!");
    });

    newSocket.addEventListener('message', (event) => {
      setMessages(prevMessages => [...prevMessages,JSON.parse(event.data).msgs[0]]);
    });

    setSocket(newSocket);
       return(()=>{
        setSocket(null);
        newSocket.close()
        
       })
   
  }, []);
 
  function sendmessage(){
    socket.send(messageText)
    setMessageText("")
    document.getElementById("inpu").focus()
  }

 async function deletemessage(messageid){
  setMessages((prevMessages)=> prevMessages.filter((msg)=> msg._id !== messageid))
  try {
    await fetch(`https://chatserver-o3ee.onrender.com/messages/${messageid}`,{method:'DELETE'})

  } catch (error) {
    console.log(error)
  }
  }
  return (
    
   <body >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
       <div id="messages">
        {messages.map((message,index) =>(
         <div id='messagecontainer'> 
          <div className="message">
            
            {message.text}
            <button id="deleteB" onClick={()=>{
              deletemessage(message._id)
            }} messageid={message._id}  > <i class="fas fa-times"></i></button>
              
           
             </div> 
             <div id="metaMessage">  <div id="sender">
              {(message.sender != null)?message.sender:"Anonymous"}
             </div> 
               <div id="timestamp">
                 {formatWhatsappDate(message.sentAt)}
               </div>
             </div>
           
             
             </div>
             )
          
        )}
       </div>

       <input id="inpu" placeholder='Write your message here'   value={messageText}
          onChange={(e) => setMessageText(e.target.value)}></input>
       <div id="send">
        <button id="b" onClick={sendmessage}>Send</button>
    </div>
   </body>
  );
}
function formatWhatsappDate(inputDate) {
  const date = new Date(inputDate);
  const now = new Date();

  // Ensure the input is a valid date
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const timeDifference = now - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours  / 24);
  const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
 if(days < 0){
  return `Today at ${formattedTime}`;
 }
 else if (days === 0 ) {
    // Today, return time
 
    return `Today at ${formattedTime}`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (days <= 7 ) {
    return `${days} days ago`;
  } else if (days <= 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
}
export default App;
