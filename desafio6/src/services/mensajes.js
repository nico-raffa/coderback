const fs = require("fs")
class ContMensajes {
    constructor(archiveName){
        this.archiveName = archiveName,
        this.data = []
    }
    async save (mensaje){
        try{
            if (this.data.length >= 0){  
                mensaje.timestamp = new Date().toLocaleString()
                this.data.push(mensaje)
                fs.promises.writeFile(this.archiveName,JSON.stringify(this.data,null,2))}
            else{
                return 
            }
        }catch(error){
            console.log(`Error en escritura: ${error}`)
        }
    }
    async getById(id){
        try{
            const objs = await this.getAll()
            const findObj = objs.find(obj => obj.id === Number(id))
            return findObj
        }catch(error){
            console.log(`Error al leer ID ${error}`)
        }
    }
    async updateById(id, newProduct){
        try {
            const list = await this.getAll()
            const old = list.findIndex(product=> product.id == id)
            let product = list[old]
            if (product){
                const {name, thumbnail, price, description, code, stock} = newProduct
                product.name = name;
                product.description = description;
                product.code = code;
                product.stock = stock;
                product.thumbnail = thumbnail;
                product.price = price;
                list[index] = product;
                await this.save(list)
            }else{
                return null
            }

            
        } catch (error) {
            return (error)            
        }
    }
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archiveName,"utf-8")
            return JSON.parse(data)
        }catch(error){
            return (`Error en lectura: ${error}`)
        }
    }
    async deleteById(id){
        const objs = await this.getAll()
        const findObj = objs.findIndex(obj => obj.id === id)
        if (findObj === -1){
            console.log(`Error al borrar, no se encontro el ID ${id}`)
        }
        objs.splice(findObj,1)
        try{
            await fs.promises.writeFile(this.archiveName,JSON.stringify(objs,null,2))
        }catch(error){
            console.log(`Error al intentar escribir el archivo ${error}`)
        }          
    }
    async deleteAll(){
        await fs.promises.unlink(this.archiveName)
    }
}
module.exports = ContMensajes
