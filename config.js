import express  from 'express'
import expressWs from 'express-ws';
const app = express();
const {app:appws } = expressWs(app)

app.set('view engine', 'ejs');


export {app,appws}