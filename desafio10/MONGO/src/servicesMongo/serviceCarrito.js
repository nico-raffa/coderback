import { CarritosModel } from "../models/carritosModel.js";
import { ProductosModel } from "../models/productosModel.js";
import emoji from 'node-emoji'
import mongoose from "mongoose";
import {conexion} from "../../config.js"
export class ContCarritos{

    async  createCart(){
        try {
            const creado = await CarritosModel.create({})
            console.log(creado)
        } catch (error) {
            console.log(emoji.get('warning'),error)            
        }
    }
    async saveProduct(idCart, idProduct){
        try {
            const cart = await this.getCart(idCart)
            const productCart = cart.products.find(p => p._id == idProduct)
            if(productCart){
                productCart.cantidad += 1
                await CarritosModel.findByIdAndUpdate(idCart,{$set:{products:cart.products}})
            }else{
                const product = await ProductosModel.findOne({_id:idProduct}).lean()
                await CarritosModel.updateOne({_id:idCart},{$push:{products:[product]}})
            }
        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
    async getCart(id){
        try {
            const products = await CarritosModel.find({_id:id}).lean()
            return products[0]
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
    async deleteById(idCart, idProduct){
        try {
            await CarritosModel.updateOne({_id:idCart},{$pull:{products:{_id:idProduct}}})
            

        } catch (error) {
            console.log(emoji.get('warning'),error)     
        }
    }
    async deleteCart(idCart){
        try {
            await CarritosModel.deleteOne({_id:idCart})
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
