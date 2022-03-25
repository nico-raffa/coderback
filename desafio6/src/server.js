const emoji = require("node-emoji");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Contenedor = require('./services/productos.js')
const ContMensajes = require('./services/mensajes.js')
const express = require("express");
const { engine } = require("express-handlebars");
const msj = new ContMensajes('./src/data/msg.json')
const prod = new Contenedor('./src/data/products.json')
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
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

io.on('connection', async (socket)=>{
  console.log(emoji.get('pizza'),'Usuario conectado')
  socket.on('disconnect', ()=>{
      console.log(emoji.get('fire'), 'Usuario desconectado')
  })
  socket.emit("productos", await prod.getAll());
  socket.on("update", async (data)=>{  
      await prod.save(data);
      io.sockets.emit("productos", await prod.getAll());
  })
  socket.emit("mensaje", await msj.getAll())
  socket.on("mensajes", async (data)=>{
      await msj.save(data)
      io.sockets.emit("mensaje", await msj.getAll())
    })
})

app.get("/productos", async (req, res) => {
  res.render("main", {
  });
});

