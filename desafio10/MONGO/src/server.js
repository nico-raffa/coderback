import express from 'express'
import { router, routerCarrito } from './controllers/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { engine } from 'express-handlebars'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.listen(8080,()=>console.log('Server abierto en el puerto 8080'))

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/views/layouts",
    })
  );
app.set('views', './src/views')
app.set('view engine', 'hbs')

app.use('/api/productos', router)
app.use('/api/carrito', routerCarrito)
app.get('*',(req,res)=>{
    res.send({
        error: -2,
        descripcion: `Ruta ${req.path} no implementada`
    })
})