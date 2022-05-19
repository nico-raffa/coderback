import { ProductsModel } from "../models/productsModel.js";
import emoji from 'node-emoji'
import mongoose from "mongoose";
import {conexion} from "../../config.js"
export class ContProductos{

    async  saveProduct(product){
        try {
            await ProductsModel.create(product)
        } catch (error) {
            console.log(emoji.get('warning'),error)            
        }
    }
    async getAll(){
        try {
            const products = await ProductsModel.find().lean()
            return products
        } catch (error) {
            console.log(emoji.get('warning'),error)
        }
    }
    
    async getById(id){
        try {
            const searched = await ProductsModel.find({_id:id}).lean()
            return searched
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
    async deleteById(id){
        try {
            await ProductsModel.deleteOne({_id:id})
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
    async updateById(id, value){
        try {
            await ProductsModel.updateOne({_id:id},{$set:value})
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
}
