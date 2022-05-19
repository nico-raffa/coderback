import passport from "../utils/passport.util.js"
import { ControllerProducts } from "./products.js";
import { showTest } from "./productsTest.js";
import { Router } from "express";
import * as AuthController from '../controllers/auth.controller.js'
import * as AuthMiddleware from '../middlewares/auth.middleware.js'
import { info } from "./info.controller.js";
import { random } from "./random.controller.js";
const products = new ControllerProducts()
export const routerProducts = new Router()
export const routerTest = new Router()
export const routerUsers =  new Router()
export const routerInfo = new Router()
export const routerRandom = new Router()
routerProducts.get('/productos', AuthMiddleware.checkAuthentication, products.show)
routerProducts.post('/productos', products.save)
routerProducts.get('/productos/:id', products.showById)
routerProducts.put('/productos/:id', products.updateOne)
routerProducts.delete('/productos', products.deleteOne)


routerTest.get('/', showTest)



routerUsers.get('/signup', AuthController.getSignup)
routerUsers.post('/signup', passport.authenticate('signup', { failureRedirect: '/failSignup' }), AuthController.postSignup)
routerUsers.get('/failSignup', AuthController.failSignup)
routerUsers.get('/login', AuthController.getLogin)
routerUsers.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), AuthController.postLogin)
routerUsers.get('/failLogin', AuthController.failLogin)
routerUsers.get('/logout', AuthController.logout)


routerInfo.get('/info', info)

routerRandom.get('/random', random)