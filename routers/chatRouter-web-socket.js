import express  from 'express'
import expressWs from 'express-ws';
import { broadcastMessageInRoom } from '../controllers/chatController.js';


const app = express()
const  {app:wsRouter} = expressWs(express.Router());
export default wsRouter
 export let chatRooms = new Map()
app.set('view engine', 'ejs');




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
       
         await broadcastMessageInRoom(msg,roomid)
   
         } catch (error) {
            console.log(error)
         }
   
         })
    } catch (error) {
        console.log(error)
    }
   
})
