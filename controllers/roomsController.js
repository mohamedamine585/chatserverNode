import {MessageDataRepository}  from "../models/message.js"
const Mr = new MessageDataRepository()

export async function getChat(roomid){
    try {
        return await Mr.fetchAll(roomid)
    } catch (error) {
        console.log(error)
    }
}