import {MessageDataRepository}  from "../models/message.js"

export default class RoomsController{
     Mr = new MessageDataRepository()
    
     async  getChat(roomid){
        try {
            return await this.Mr.fetchAll(roomid)
        } catch (error) {
            console.log(error)
        }
    }
}