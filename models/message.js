import { text } from 'express';
import mongoose from 'mongoose'
const MessageSchema = new mongoose.Schema({

    text: {
        type: String,
        required:true
    },
    sentAt:{
        type:Date,
        default:Date.now(),
        required:true,

    },
    sender:{
        type: mongoose.Types.ObjectId,
    },
    group:{
        type:Number
    }
});
const Message = mongoose.model('Message',MessageSchema,'messages')

export default class MessageDataRepository {
   
       async  fetchAll(groupid) {
         try {
           
          const messages = await  Message.find({group:groupid});
          return messages;
         } catch (error) {
            console.log(error)
         }
       }

       async saveMessage(message,sender,group){
        try {
            let newMessage =new Message({
                text:message,
                sender:sender,
                group:group,
                sentAt:Date.now(),


            })

             await newMessage.save()
           
            newMessage = null;
        } catch (error) {
            console.log(error)
        }
       }
}

 

