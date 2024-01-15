import express  from 'express'
import MessageDataRepository from '../models/message.js';

const Mr = new MessageDataRepository()
const  ChatRouter= express.Router();

ChatRouter.get('/',(req,res)=>{
   return res.status(404).end()
})

ChatRouter.get('/chat/:roomid',async (req,res,next)=>{
    try {
        let roomid = req.params.roomid
            if(roomid >= 0){

        const messages  = await Mr.fetchAll(roomid)
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