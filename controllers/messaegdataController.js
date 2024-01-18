import {MessageDataRepository} from "../models/message.js"


export default class MessagesController{
     Mr = new MessageDataRepository()

     // ****** save in database 
       async  saveMessage(msg){
        try {
             this.Mr.saveMessage();
        } catch (error) {
            console.log(error)
        }
    }

    // ***** fetch from database *******
     async   fetchAll(roomid){
        try {
           return await this.Mr.fetchAll(roomid);
        } catch (error) {
            console.log(error)
        }
    }


    // ****     delete database ********
    
     async  deleteMessage(messageid){
        try {
          this. Mr.deleteMessage(messageid)
        } catch (error) {
            console.log(error)
        }
    }
}