import { ContCarrito } from "../services/carts.js";
const carrito = new ContCarrito("./src/data/carritos.json");
import { prod } from "./products.js";

export class ControllerCarritos {
  mostrarPorId = async (req, res) => {
      const getCart = await carrito.getById(Number(req.params.id));
      if(getCart){
          let productsInCart = []
          productsInCart = getCart.products;
          res.render("../views/cart", {
              getCart,
              productsInCart
          });
      }else{
          res.send('El carrito no existe')
      }
  };
  guardar = async (req, res) => {
    await carrito.save({ products: [] });
    res.status(200).send("Carrito guardado");
  };
  actualizar = async (req, res) => {
    const cart = await carrito.getById(req.params.id);
    const product = await prod.getById(req.body.id);
    cart.products.push(product);
    await carrito.updateById(cart, Number(req.params.id));
  };
  borrarCarrito = async (req, res) => {
    await carrito.deleteById(Number(req.params.id));
    res.status(200);
  };
  borrarProducto = async (req, res) => {
    await carrito.deleteProductById(Number(req.params.id), Number(req.body.id));
    res.status(200);
  };
}

function saludar () {
    console.log('Hola mundo')
}