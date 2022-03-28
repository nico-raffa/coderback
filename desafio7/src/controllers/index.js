import { ControllerProductos } from "./products.js";
import { ControllerCarritos } from "./carts.js";
import { Router } from "express";

const products = new ControllerProductos();
const carts = new ControllerCarritos()
export const routerProductos = new Router();
export const routerCarritos = new Router();

routerProductos.get("/", products.show)
routerProductos.get("/:id", products.showById)
routerProductos.post("/", products.save)
routerProductos.put("/:id", products.update)
routerProductos.delete("/:id", products.deleteById)

routerCarritos.get("/:id/productos", carts.mostrarPorId)
routerCarritos.put("/:id/productos", carts.actualizar)
routerCarritos.delete("/:id/productos/:id", carts.borrarProducto)
routerCarritos.post("/", carts.guardar)
routerCarritos.delete("/:id", carts.borrarCarrito)
