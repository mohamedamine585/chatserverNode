import {MessageDataRepository} from "../models/message.js"
const Mr = new MessageDataRepository()
export async  function saveMessage(msg){
    try {
        await Mr.saveMessage();
    } catch (error) {
        console.log(error)
    }
}
export async  function fetchAll(roomid){
    try {
       return await Mr.fetchAll(roomid);
    } catch (error) {
        console.log(error)
    }
}

export async function deleteMessage(messageid){
    try {
       Mr.deleteMessage(messageid)
    } catch (error) {
        console.log(error)
    }
}