import { MessagesModel } from "../models/messagesModel.js"
import emoji from 'node-emoji'
import mongoose from "mongoose";
import {conexion} from "../../config.js"
export class Messages {
    async save(message){
        try {
            console.log(message)
            await MessagesModel.create(message)
        } catch (error) {
            console.log(emoji.get('warning'),error)            
        }
    }
    async getAll(){
        try {
            const messages = await MessagesModel.find().lean()
            return messages
        } catch (error) {
            console.log(emoji.get('warning'),error)
        }
    }
    async deleteAll(){
        try {
            await this.db.from(this.table).delete()
        } catch (error) {
            console.log(error)            
        }
    }
}
