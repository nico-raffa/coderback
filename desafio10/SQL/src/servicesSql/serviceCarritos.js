import knex from "knex"
export class ContCarrito {
    constructor(config, table){
        this.knex = knex(config)
        this.table = table
    }
    async create(){
        try {
            const timestamp1 = new Date().toLocaleString()
            await this.knex.insert({cartTimestamp: timestamp1,idCarrito:1}).from(this.table)
        } catch (error) {
            console.log(error) 
        }
    }
    async getCart(id){
        try {
            const findById = await this.knex.select().distinct('idCarrito','cartTimestamp').from(this.table).select().where("idCarrito",id)
            return findById
        } catch (error) {
            console.log(error)            
        }
    }
    async getById(id){
        try {
            const findById = await this.knex.from('productos').join(this.table, 'productos.id','=','carritos.idProduct').where('idCarrito',id)
            return findById
        } catch (error) {
            console.log(error)            
        }
    }
    async updateById(id, field, newValue){
        try {
            await this.knex.from(this.table).update(field,newValue).where('id',id)
        } catch (error) {
            console.log(error)            
        }
    }
    async saveProduct(idCart,id){
        try {
            let exist = await this.knex.from(this.table).select('id').whereExists(this.knex.select('id').from(this.table).where('id',id))
            let productExist = await this.knex.from('productos').select('id').where('id',id)
            if(exist.length !== 0){
                if(productExist.length === 0){
                    await this.knex.from(this.table).insert({idProduct:id, idCarrito:idCart, cantidad:1}).where('idCarrito',idCart)
                }else{
                    await this.knex.from(this.table).increment('cantidad',1).where('idProduct', id)
                }
            }else{
            }
        } catch (error) {
            console.log(error)            
        }
    }
    async deleteById(id){
        try {
            await this.knex.from(this.table).del().where('idCarrito',id)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProductById(id){
        try {
            await this.knex.from(this.table).del().where('idProduct',id)
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
