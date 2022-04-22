import {configSql2} from './config.js'
import knex from 'knex'
async function crearTablaProductos (){
    const db = knex(configSql2)
    try {
        const exist = await db.schema.hasTable("productos")
        if (!exist) {
            await db.schema.createTable("productos",(table)=>{
                table.increments("id").primary().notNullable()
                table.string("name",50).notNullable()
                table.integer("price",50).notNullable()
                table.text("thumbnail",200).notNullable()
                table.text("description",200).notNullable()
                table.integer("codebar",50).notNullable().unique()
                table.text("productTimestamp").notNullable()
                table.integer("stock",255).notNullable()
                console.log("Tabla creada")
            })
        }           
    } catch (error) {
        console.log(error)            
    }finally{
        db.destroy()
    }
}
crearTablaProductos()
async function crearTablaCarritos (){
    const db = knex(configSql2)
    try {
        const exist = await db.schema.hasTable("carritos")
        if (!exist) {
            await db.schema.createTable("carritos",(table)=>{
                table.increments("id").primary().notNullable()
                table.text("cartTimestamp")
                table.integer("codebar").unique()
                table.integer("idCarrito").notNullable
                table.integer("cantidad")
                console.log("Tabla creada")
            })
        }           
    } catch (error) {
        console.log(error)            
    }finally{
        db.destroy()
    }
}
crearTablaCarritos()