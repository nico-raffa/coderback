import { ControllerProductos } from "../controllers/productos.js";
import { ControllerCarritos } from "../controllers/carritos.js";
import { Router } from "express";
const controllerProductos = new ControllerProductos();
const controllerCarritos = new ControllerCarritos();
const router = new Router();
const routerCarrito = new Router();
//Productos
router.get("/", controllerProductos.mostrar);
router.get("/:id", controllerProductos.mostrarPorId);
router.post("/", controllerProductos.guardar);
router.delete("/:id", controllerProductos.borrar);
router.put("/:id", controllerProductos.actualizar);
//Carrito
routerCarrito.get("/:id/productos", controllerCarritos.mostrarPorId);
routerCarrito.post("/", controllerCarritos.guardar);
routerCarrito.post("/:id/productos", controllerCarritos.actualizar);
routerCarrito.delete("/:id", controllerCarritos.borrarCarrito);
routerCarrito.delete("/:id/productos/:id", controllerCarritos.borrarProducto);

export { router, routerCarrito }
