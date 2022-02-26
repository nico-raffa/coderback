const express = require('express')
const app = express()
const PORT = 8080
const Contenedor = require ('./Contenedor.js')
const productos = new Contenedor('products.json')
const server = app.listen(PORT, ()=>{
    console.log(`Server abierto en ${PORT}`)
})
app.get('/productos', async (req,res) =>{
    const products = await productos.getAll()
    res.send(products)
})
app.get('/productoRandom', async (req,res)=>{
    const all = await productos.getAll()
    const random = parseInt(Math.random() * all.length)
    res.send(all[random])
})