import { ControllerProducts } from "./products.js";
import { Router } from "express";
const products = new ControllerProducts()
export const routerProducts = new Router()



routerProducts.get('/', products.show)
routerProducts.post('/', products.save)
routerProducts.get('/:id', products.showById)
routerProducts.put('/:id', products.updateOne)
routerProducts.delete('/', products.deleteOne)

