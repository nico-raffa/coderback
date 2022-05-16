import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    author:{
        id:{
            type: String,
            required: true
        },
        nombre:{
            type: String,
            required: true
        },
        apellido:{
            type: String,
            required: true
        },
    
        edad:{
            type: Number,
            required: true
        },
        alias:{
            type: String,
            required: true,
            index: true
        },
        avatar:{
            type: String,
            required: true
        }
    },
    text:{
        type: String,
        required: true
    }
})

export const MessagesModel = mongoose.model('Mensajes', Schema)