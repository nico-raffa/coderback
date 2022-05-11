import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    codebar:{
        type: Number,
        required: true,
        index: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        default: false,
    }
})

export const ProductsModel = mongoose.model('Productos', Schema)