import {PORT,HOST} from './utils.js'
import express  from 'express'
import expressWs from 'express-ws';
import  ChatRouter  from './routers/chatRouter.js'
import Mongodb from './models/database.js';
import wsRouter from './routers/chatRouter-web-socket.js';
const app = express();
const {app:appws } = expressWs(app)
app.set('view engine', 'ejs');
await (new Mongodb()).initDB()

app.use('/chat',ChatRouter)
appws.use('/chat',wsRouter)

appws.listen(PORT,HOST,()=>{
    console.log(`server is running on ${HOST}:${PORT}`)
})
 