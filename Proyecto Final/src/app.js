const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const exphbs = require("express-handlebars");
const socket = require("socket.io");

//Midleware

app.use(express.static("../src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handelbars");
app.set("views", "../src/views");


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/src/routes/views.router.js");



const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})

const ProductManager = require("../src/controllers/product-manager.js");
const productManager = new ProductManager("./models/productos.json");

//server Socket.io

const io = socket.Server(httpServer);

io.on("conection", async (socket) => {
    console.log("Un cliente conectado");

    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);

        //Debo enviarle la lista actualizada al cliente: 
        io.sockets.emit("productos", await productManager.getProducts());

    })
    //Agregar producto: 
    socket.on("agregarProducto", async (producto) => {
        console.log(producto);
        await productManager.addProduct(producto);
        io.sockets.emit("productos", await productManager.getProducts());
    })
})


