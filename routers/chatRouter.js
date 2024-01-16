import express  from 'express'
import { getChat } from '../controllers/roomsController.js';
import { deleteMessage } from '../controllers/messaegdataController.js';

const  ChatRouter= express.Router();

ChatRouter.get('/',(req,res)=>{
   return res.status(404).end()
})

ChatRouter.delete('/messages/:messageid',async(req,res,next)=>{
   try {
        deleteMessage(req.params.messageid)
       
   } catch (error) {
    console.log(error)
   }
})
ChatRouter.get('/chat/:roomid',async (req,res,next)=>{
    try {
        let roomid = req.params.roomid
            if(roomid >= 0){

        const messages  = await getChat(roomid)
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