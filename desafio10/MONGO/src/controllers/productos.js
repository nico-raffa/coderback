import { ContProductos } from '../servicesMongo/serviceProductos.js'
export const prod = new ContProductos()
export class ControllerProductos {
  mostrar = async (req, res) => {
    const getProds = await prod.getAll();
    res.render("../views/main", {
      getProds
    });
  };
  mostrarPorId = async (req, res) => {
    const { id } = req.params;
    const getProds = await prod.getById(id)
    res.render("../views/main", {
      getProds
    });
  };
  guardar = async (req, res) => {
    const { body } = req;
    await prod.saveProduct(body);
    res.status(200).redirect("/api/productos");
  };
  actualizar = async (req, res) => {
    const { id } = req.params;
    const { body } = req
    console.log(body)
    await prod.updateById(id, body);
    res.sendStatus(200)
  };
  borrar = async (req, res) => {
    const { id } = req.params;
    await prod.deleteById(id);
    res.sendStatus(200)
  };
}