 const PORT = 8080;
 const HOST = '0.0.0.0'
export {PORT,HOST,intializingServer}
import Mongodb from './models/database.js';

 async function intializingServer(params){
    try {
        await (new Mongodb()).initDB()

    } catch (error) {
        print(error)
    }
}