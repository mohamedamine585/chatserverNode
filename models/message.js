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
export const Message = mongoose.model('Message',MessageSchema,'messages')

export   class MessageDataRepository {
   
       async  fetchAll(groupid) {
         try {
           
          const messages = await  Message.find({group:groupid});
      
          return messages;
         } catch (error) {
            console.log(error)
         }
       }

       async saveMessage(newMessage){
        try {
        
              newMessage.save()

       // make *usersInRoom* candidate for garbage collector
            newMessage = null;
        } catch (error) {
            console.log(error)
        }
       
       }
    async deleteMessage(messageid){
        try {
        await Message.findByIdAndDelete(new mongoose.Types.ObjectId(messageid))
        } catch (error) {
            console.log(error)
        }
    }
}

 

