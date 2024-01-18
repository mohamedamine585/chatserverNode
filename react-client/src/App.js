import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [messages,setMessages] = useState([]);
  const [socket,setSocket] = useState(null)
  const [messageText, setMessageText] = useState('');
  useEffect(() => {
    const newSocket = new WebSocket("wss://chatserver-pirx.onrender.com/chat/1");

    newSocket.addEventListener('open', (event) => {
      console.log("Connection opened!");
    });

    newSocket.addEventListener('message', (event) => {
      setMessages(prevMessages => [...prevMessages,JSON.parse(event.data).msgs[0]]);
    });

    setSocket(newSocket);

   
  }, []);
 
  function sendmessage(){
    socket.send(messageText)
    setMessageText("")
    document.getElementById("inpu").focus()
  }
  return (
    
   <body >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
       <div id="messages">
        {messages.map((message,index) =>(
          <div className="message">
            
            {message.text}
            <button id="deleteB"> <i class="fas fa-times"></i></button>
             </div>)
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

export default App;
