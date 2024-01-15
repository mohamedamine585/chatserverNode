import express  from 'express'
import MessageDataRepository from '../models/message.js';
import expressWs from 'express-ws';
const app = express()
const  {app:wsRouter} = expressWs(express.Router());
export default wsRouter
const Mr = new MessageDataRepository()
const chatRooms = new Map()
app.set('view engine', 'ejs');


// broadcastMessage in Chat Room
export function broadcastMessageInRoom(message,roomid){
    try {
         let usersInRoom = chatRooms.get(roomid) ;
       usersInRoom.forEach(user => {
            user.send(message)
        });
      // make *usersInRoom* candidate for garbage collector
        usersInRoom = null;

    } catch (error) {
        console.log(error)
    }
}

wsRouter.ws('/chat/:roomid',(ws,req,next)=>{
    try {

        let roomid
        roomid = req.params["roomid"]
      
       if(!chatRooms.has(roomid))
       {
           chatRooms.set(roomid,[])
         
       }
           chatRooms.get(roomid).push(ws)
       ws.on('message', async (msg)=>{
         try {
            if(msg == "" || msg == undefined){
                throw Error()
          }
          await Mr.saveMessage(msg,null,roomid)
          broadcastMessageInRoom(msg,roomid)
   
         } catch (error) {
            console.log(error)
         }
   
         })
    } catch (error) {
        console.log(error)
    }
   
})
