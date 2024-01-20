import express  from 'express'
import expressWs from 'express-ws';
import ChatController from '../controllers/chatController.js';
import MessagesController from '../controllers/messaegdataController.js';

const app = express()
const  {app:wsRouter} = expressWs(express.Router());
export default wsRouter
 export let chatRooms = new Map()
app.set('view engine', 'ejs');

const mntr = new MessagesController()

const ch = new  ChatController()
wsRouter.ws('/chat/:roomid',async(ws,req,next)=>{
    
    try {

        let roomid
        roomid = req.params["roomid"]
      
       if(!chatRooms.has(roomid))
       {
           chatRooms.set(roomid,[])
         
       }
           chatRooms.get(roomid).push(ws)
           ws.send(await mntr.fetchAll(req.params.roomid))
       ws.on('message', async (msg)=>{
         try {
            if(msg == "" || msg == undefined){
                throw Error()
          }
         await ch.HandleMessage(msg,roomid)
   
         } catch (error) {
            console.log(error)
         }
   
         })
    } catch (error) {
        console.log(error)
    }
   
})
