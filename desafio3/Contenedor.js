const fs = require("fs");
class Contenedor {
  constructor(archiveName) {
    (this.archiveName = archiveName),
    this.data = [];
  }
  async save(product) {    
    try {
      if(!fs.existsSync(this.archiveName)){ //Si no existe el archivo
        product.id = 1 //Si no existe ningún producto, el primero tendría el ID 1
        this.data.push(product); // Guardo el producto en el array this.data
        
        fs.promises.writeFile(
          this.archiveName,
          JSON.stringify(this.data, null, 2) 
        ); //Guardo el primer producto
      }else{
        this.data = await this.getAll() //Si el archivo existe y tiene datos, quedan guardados
        product.id = this.getMaxId() + 1; //Obtengo el ultimo id y le sumo 1
        this.data.push(product); //Agrego el producto al array this.data
        
        fs.promises.writeFile(
          this.archiveName,
          JSON.stringify(this.data, null, 2)
        ); //Agrego el producto a this.archivename
      }
    } catch (error) {
      console.log(`Error en escritura: ${error}`);
    }
  }
  getMaxId() {
    var maxValue = Number.MIN_VALUE;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id > maxValue) {
        maxValue = this.data[i].id;
      }
    }
    return maxValue;
  }
  async getById(id) {
    try {
      const objs = await this.getAll();
      const findObj = objs.find((obj) => obj.id === Number(id));
      return findObj;
    } catch (error) {
      console.log(`Error al leer ID ${error}`);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archiveName, "utf-8");
      return JSON.parse(data);
      
    } catch (error) {
      return `Error en lectura: ${error}`;
    }
  }
  async deleteById(id) {
    const objs = await this.getAll();
    const findObj = objs.findIndex((obj) => obj.id === id);
    if (findObj === -1) {
      console.log(`Error al borrar, no se encontro el ID ${id}`);
    }
    objs.splice(findObj, 1);
    try {
      await fs.promises.writeFile(
        this.archiveName,
        JSON.stringify(objs, null, 2)
      );
    } catch (error) {
      console.log(`Error al intentar escribir el archivo ${error}`);
    }
  }
  async deleteAll() {
    await fs.promises.unlink(this.archiveName);
  }
}
module.exports = Contenedor