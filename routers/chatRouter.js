import express  from 'express'
import MessageDataRepository from '../models/message.js';

const Mr = new MessageDataRepository()
const  ChatRouter= express.Router();



ChatRouter.get('/:roomid',async (req,res,next)=>{
    try {
        
        let roomid = req.params.roomid
        const messages  = await Mr.fetchAll(roomid)
        res.render('chat',{messages,roomid},)
    } catch (error) {
        console.log(error)
    }
 

})
export default ChatRouter;