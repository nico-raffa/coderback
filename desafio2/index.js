const fs = require("fs");
class Contenedor {
  constructor(archiveName) {
    (this.archiveName = archiveName), (this.id = 0);
    this.data = [];
  }
  async save(product) {
    
    this.id++
    try {
      product = {
        id: this.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      };
      this.data.push(product);
      
      fs.promises.writeFile(
        this.archiveName,
        JSON.stringify(this.data, null, 2)
      );
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
const p1 = {
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const p2 = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculathor-math-tool-school-256.png",
};
const p3 = {
  title: "Calculadora2",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculathor-math-tool-school-256.png",
};
// Quitar comentario y volver a comentar para no provocar errores
async function pruebas() {
    const prods = new Contenedor("products.json");
    // prods.save(p1);
    // prods.save(p2);
    // prods.save(p3);
    // const datos = await prods.getAll();
    // console.log(datos);
    // prods.deleteAll()
    // const byId = await prods.getById(2)
    // console.log(byId)
    // prods.deleteById(1)
}
pruebas()