import { chatRooms } from "../routers/chatRouter-web-socket.js";
import {Message, MessageDataRepository} from '../models/message.js';
export default class ChatController{

    
     Mr = new MessageDataRepository()
    
    // broadcastMessage in Chat Room
     async  HandleMessage(message,roomid){
        try {
         
            let newMessage =new Message({
                text:message,
                sender:null,
                group:roomid,
                sentAt:Date.now(),
    
    
            })

             
               // save message in db *************
               this.Mr.saveMessage(newMessage)


               this.broadcastMessageInRoom(newMessage,roomid)
               
      
    
        } catch (error) {
            console.log(error)
        }
    }

    broadcastMessageInRoom(newMessage,roomid){
        try {
            
            let usersInRoom = chatRooms.get(roomid) ;
            
            newMessage= JSON.stringify({'msgs':[{'text':newMessage.text,'_id':newMessage._id,'sender':newMessage.sender,'sentAt':newMessage.sentAt}]});
        usersInRoom.forEach(user => {
             user.send(newMessage)

         });
             // make *usersInRoom* candidate for garbage collector
             usersInRoom = null;
 
        } catch (error) {
            console.log(error)
        }
    }
     
    

}

