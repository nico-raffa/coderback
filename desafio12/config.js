import mongoose from 'mongoose'
import emoji from 'node-emoji'
import dotenv from 'dotenv'
dotenv.config()
export const conexion = mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error)=>{
    if(error){
    console.log(error)}else{
        console.log(emoji.get('fire'),'Conectado a la base de datos')
    }
})