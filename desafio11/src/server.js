import express from "express";
import { routerProducts, routerTest } from "./controllers/index.js";
import { Messages } from "./services/messages.service.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import { createServer } from 'http' 
import { Server } from 'socket.io'
import emoji from "node-emoji";
const msj = new Messages();
const app = express();
const httpServer = new createServer(app)
const io = new Server(httpServer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
httpServer.listen(8080, () => console.log(emoji.get('computer'),'Server started on 8080'))

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use("/productos", routerProducts);
app.use("/api/productos-test", routerTest)
io.on('connection', async (socket)=>{
    console.log(emoji.get('pizza'),'Usuario conectado')
    socket.on('disconnect', ()=>{
        console.log(emoji.get('fire'), 'Usuario desconectado')
    })
    socket.emit("mensaje", await msj.getAll())
    socket.on("mensajes", async (data)=>{
        await msj.save(data)
        io.sockets.emit("mensaje", await msj.getAll())
    })
    
})
app.get('/form', (req,res)=>{
    res.render('form')
})