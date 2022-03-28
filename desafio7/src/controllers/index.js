import { ControllerProductos } from "./products.js";
import { Router } from "express";
const products = new ControllerProductos();
export const routerProductos = new Router();

routerProductos.get("/", products.show)
routerProductos.get("/:id", products.showById)
routerProductos.post("/", products.save)
routerProductos.put("/:id", products.update)
routerProductos.delete("/:id", products.deleteById)
