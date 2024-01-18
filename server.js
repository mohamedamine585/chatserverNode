import {PORT,HOST, intializingServer} from './utils.js'
import {app,appws} from './config.js'
import  ChatRouter  from './routers/chatRouter.js'
import wsRouter from './routers/chatRouter-web-socket.js';
import path, { dirname ,join} from 'path'

import { fileURLToPath } from 'url';

import express from 'express'

// *** intializing mongoose ******
await intializingServer();

app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), './react-client/build')));
app.use('/',ChatRouter)
appws.use('/',wsRouter)



appws.listen(PORT,HOST,()=>{
    console.log(`server is running on ${HOST}:${PORT}`)
})
 