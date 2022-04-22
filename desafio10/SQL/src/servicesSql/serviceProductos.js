import knex from "knex"
export class Contenedor {
    constructor(config, table){
        this.knex = knex(config)
        this.table = table
    }
    async save(product){
        try {
            let exist = await this.knex.from(this.table).select().where('name',product.name).andWhere('codebar',product.codebar)
            if(exist.length === 0){
                product.productTimestamp = new Date().toLocaleString()
                await this.knex.insert(product).from(this.table)
            }else{
                await this.knex.from(this.table).increment('stock',product.stock).where('name',product.name).andWhere('codebar',product.codebar)
            }
        } catch (error) {
            console.log(error) 
        }
    }
    async getAll(){
        try {
            const productos = await this.knex.select().from(this.table).select()
            return productos
        } catch (error) {
            console.log(error)            
        }
    }
    async getById(id){
        try {
            const findById = await this.knex.select().from(this.table).select().where("id",id)
            return findById
        } catch (error) {
            console.log(error)            
        }
    }
    async updateById(id, field, newValue){
        try {
            await this.knex.from(this.table).update(field,newValue).where('codebar',id)
        } catch (error) {
            console.log(error)            
        }
    }
    async deleteById(id){
        try {
            await this.knex.from(this.table).del().where('codebar',id)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll(){
        try {
            await this.knex.from(this.table).del()
        } catch (error) {
            console.log(error)
        }
    }
}
