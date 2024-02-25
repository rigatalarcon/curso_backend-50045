
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
const mongoose = require("mongoose");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const path = require("path");
//Midleware

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const ProductManager = require("../src/controllers/product-manager.js");
const productManager = new ProductManager("./src/models/product.json");

//Iniciamos el servidor
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})

//conecto a MongoDB

//mongoose.connect("mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/?retryWrites=true&w=majority")
  //  .then(() => console.log("conectados a la BD"))
    //.catch((error) => console.log(error))

//server Socket.io

const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente conectado");

    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        io.sockets.emit("productos", await productManager.getProducts());
    })
    
    socket.on("agregarProducto", async (producto) => {
        console.log(producto);
        await productManager.addProduct(producto);
        io.sockets.emit("productos", await productManager.getProducts());
    })
})



