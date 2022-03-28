import express from "express";
import { routerProductos } from "./controllers/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = app.listen(8080, () => console.log(`Server started on 8080`));
server.on("error", (err) => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.use(express.static("./src/public"));
app.use("/api/productos", routerProductos);

app.set("views", "./src/views");
app.set("view engine", "hbs");
app.get("/form", (req, res) => {
  res.render("form",{
    
  });

})
app.get("*", (req, res) => {
  res.status(501).send({
    error: -2,
    descripcion: `Ruta ${req.path} no implementada`,
  });
});
