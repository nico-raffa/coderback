import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    products:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
        },
        name:{
            type: String,
            required: false
        },
        price:{
            type: Number,
            required: false
        },
        description:{
            type: String,
            required: false
        },
        codebar:{
            type: Number,
            required: false
        },
        thumbnail:{
            type: String,
            required: false
        },
        cantidad:{
            type: Number,
            required: false,
            default: 1
        }
    }]
})

export const CarritosModel = mongoose.model('Carritos', Schema)