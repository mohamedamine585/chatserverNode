import { chatRooms } from "../routers/chatRouter-web-socket.js";
import {Message} from '../models/message.js';
import {MessageDataRepository} from '../models/message.js';


let Mr = new MessageDataRepository()

// broadcastMessage in Chat Room
export async function broadcastMessageInRoom(message,roomid){
    try {
     
        let newMessage =new Message({
            text:message,
            sender:null,
            group:roomid,
            sentAt:Date.now(),


        })

         // ***** ***** >> save message in database
           Mr.saveMessage(newMessage)
     

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