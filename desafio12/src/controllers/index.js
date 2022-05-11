import { ControllerProducts } from "./products.js";
import { showTest } from "./productsTest.js";
import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { login, logout } from "./user.js";
const products = new ControllerProducts()
export const routerProducts = new Router()
export const routerTest = new Router()


routerProducts.get('/productos', auth, products.show)
routerProducts.post('/productos', products.save)
routerProducts.get('/productos/:id', products.showById)
routerProducts.put('/productos/:id', products.updateOne)
routerProducts.delete('/productos', products.deleteOne)


routerTest.get('/', showTest)

routerProducts.post('/login', login)
routerProducts.get('/login', login)
routerProducts.get('/logout', logout)