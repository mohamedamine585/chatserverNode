import mongoose from 'mongoose'



 export default class Mongodb{
    static mongodb;

    
    async initDB(){
    try {
       await mongoose.connect('mongodb+srv://mohamedamine:medaminetlili123@cluster0.qf8cb49.mongodb.net/chatauth');
      const db = mongoose.connection;
      db.on('error',(err)=>{
        console.log(err)
      })

      
    } catch (error) {
        console.log(error)
    }
}
}

