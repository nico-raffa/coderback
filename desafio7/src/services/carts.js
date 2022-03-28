import fs from "fs";
export class ContCarrito {
  constructor(archiveName) {
    (this.archiveName = archiveName), (this.id = 0);
    this.data = [];
  }
  async save(product) {
    this.id++;
    try {
      if (this.data.length >= 0) {
        product.id = this.id;
        product.timestamp = new Date().toLocaleString();
        this.data.push(product);
        fs.promises.writeFile(
          this.archiveName,
          JSON.stringify(this.data, null, 2)
        );
      } else {
        return;
      }
    } catch (error) {
      console.log(`Error en escritura: ${error}`);
    }
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
  async updateById(obj, id){
        const array = await this.getAll()
        const elemento = array.findIndex(x => x.id == id)
        if(elemento == -1) {
            throw new Error(`No se encontró el id: ${id}`)
            } else {
            array[elemento] = {...obj, id}
            try{
            await fs.promises.writeFile(this.archiveName, JSON.stringify(array, null, 2))
            }catch(error){
            console.log(error)
        }
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
  async deleteProductById(idCart, idProduct){
    const objs = await this.getById(idCart);
    const product = objs.products
    const findObj = product.find((obj) => obj.id === idProduct);
    if (idProduct > product.length) {
        console.log(`Error al borrar, no se encontro el ID ${idProduct}`);
    }else{
        product.splice(findObj, 1);
    }
    try {
      await fs.promises.writeFile(
        this.archiveName,
        JSON.stringify([objs], null, 2)
      );
    } catch (error) {
      console.log(`Error al intentar escribir el archivo ${error}`);
    }      
  }
  async deleteAll() {
    await fs.promises.unlink(this.archiveName);
  }
}
export default ContCarrito;
