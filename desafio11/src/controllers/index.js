import { ControllerProducts } from "./products.js";
import { showTest } from "./productsTest.js";
import { Router } from "express";
const products = new ControllerProducts()
export const routerProducts = new Router()
export const routerTest = new Router()


routerProducts.get('/', products.show)
routerProducts.post('/', products.save)
routerProducts.get('/:id', products.showById)
routerProducts.put('/:id', products.updateOne)
routerProducts.delete('/', products.deleteOne)


routerTest.get('/', showTest)