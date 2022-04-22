import { ContCarrito } from '../servicesSql/serviceCarritos.js'
import { configSql2 } from '../../config.js'
import { prod } from "./productos.js";
const carrito = new ContCarrito(configSql2,"carritos")

export class ControllerCarritos {  
  mostrarPorId = async (req, res) => {
    const { id } = req.params;
    const productsInCart = await carrito.getById(id)
    const cart = await carrito.getCart(id)
    res.render('../views/cart',{
      productsInCart,
      cart
    })    
  };
  guardar = async (req, res) => {
    await carrito.create(req.params.id);
    res.sendStatus(200)
  };
  actualizar = async (req, res) => {
    await carrito.saveProduct(Number(req.params.id),req.body.id)
    res.sendStatus(200)
  };
  borrarCarrito = async (req, res) => {
    await carrito.deleteById(Number(req.params.id));
    res.sendStatus(200)
  };
  borrarProducto = async (req, res) => {
    await carrito.deleteProductById(Number(req.params.id),Number(req.body.id))
    res.sendStatus(200)
  }
}
