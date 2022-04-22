import { ProductosModel } from "../models/productosModel.js";
import emoji from 'node-emoji'
import mongoose from "mongoose";
import {conexion} from "../../config.js"
export class ContProductos{

    async  saveProduct(product){
        try {
            await ProductosModel.create(product)
        } catch (error) {
            console.log(emoji.get('warning'),error)            
        }
    }
    async getAll(){
        try {
            const products = await ProductosModel.find().lean()
            return products
        } catch (error) {
            console.log(emoji.get('warning'),error)
        }
    }
    async getById(id){
        try {
            const searched = await ProductosModel.find({_id:id}).lean()
            return searched
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
    async deleteById(id){
        try {
            await ProductosModel.deleteOne({_id:id})
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
    async updateById(id, value){
        try {
            await ProductosModel.updateOne({_id:id},{$set:value})
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
}
