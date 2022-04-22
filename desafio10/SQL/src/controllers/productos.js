import { Contenedor } from '../servicesSql/serviceProductos.js'
import { configSql2 } from '../../config.js'
export const prod = new Contenedor(configSql2,"productos")
export class ControllerProductos {
  mostrar = async (req, res) => {
    const getProds = await prod.getAll();
    res.render("../views/main", {
      getProds
    });
  };
  mostrarPorId = async (req, res) => {
    const { id } = req.params;
    const buscarId = await prod.getById(id)
    res.render("../views/main", {
      buscarId
    });
  };
  guardar = async (req, res) => {
    const { body } = req;
    await prod.save(body);
    res.status(200).redirect("/api/productos");
  };
  actualizar = async (req, res) => {
    const { id } = req.params;
    const { body } = req
    await prod.updateById(id, body);
    res.sendStatus(200)
  };
  borrar = async (req, res) => {
    const { id } = req.params;
    await prod.deleteById(id);
    res.sendStatus(200)
  };
}