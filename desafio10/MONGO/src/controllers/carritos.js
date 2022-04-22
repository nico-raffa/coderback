import { prod } from "./productos.js";
import { ContCarritos } from "../servicesMongo/serviceCarrito.js";
const carrito = new ContCarritos
export class ControllerCarritos {  
  mostrarPorId = async (req, res) => {
    const { id } = req.params;
    let cart = await carrito.getCart(id)
    cart = cart.products
    res.render('../views/cart',{
      cart
    })    
  };
  crear = async (req, res) => {
    await carrito.createCart(req.params.id);
    res.sendStatus(200)
  };
  actualizar = async (req, res) => {
    await carrito.saveProduct(req.params.id,req.body.id)
    res.sendStatus(200)
  };
  borrarCarrito = async (req, res) => {
    await carrito.deleteCart(req.params.id);
    res.sendStatus(200)
  };
  borrarProducto = async (req, res) => {
    await carrito.deleteById(req.params.id,req.params.id_prod)
    res.sendStatus(200)
  }
}
