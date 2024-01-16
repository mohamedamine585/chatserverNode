import {PORT,HOST, intializingServer} from './utils.js'
import {app,appws} from './config.js'
import  ChatRouter  from './routers/chatRouter.js'
import wsRouter from './routers/chatRouter-web-socket.js';




// *** intializing mongoose ******
await intializingServer();


app.use('/',ChatRouter)
appws.use('/',wsRouter)



appws.listen(PORT,HOST,()=>{
    console.log(`server is running on ${HOST}:${PORT}`)
})
 