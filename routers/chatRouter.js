import express  from 'express'
import RoomsController from '../controllers/roomsController.js';
import MessagesController from '../controllers/messaegdataController.js';
import path, { dirname ,join} from 'path'
import { fileURLToPath } from 'url';
const  ChatRouter= express.Router();

const rc = new RoomsController()
const mc = new MessagesController()
ChatRouter.get('/',(req,res)=>{
   return res.sendFile(join(dirname(fileURLToPath(import.meta.url)),"../react-client/build",'index.html'))
})

ChatRouter.delete('/messages/:messageid',async(req,res,next)=>{
   try {
       mc.deleteMessage(req.params.messageid)
       
   } catch (error) {
    console.log(error)
   }
})
ChatRouter.get('/chat/:roomid',async (req,res,next)=>{
    try {
        let roomid = req.params.roomid
            if(roomid >= 0){

        const messages  = await  rc.getChat(roomid)
        res.render('chat',{messages,roomid},)
    } 
    else{
         res.status(404).end()
    }
    } catch (error) {
        console.log(error)
    }
 

})
export default ChatRouter;