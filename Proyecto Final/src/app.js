
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
const mongoose = require("mongoose");
const session = require("express-session");
const FileStore = require("session-file-store");
const fileStore = FileStore(session);
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");


const sessionRouter = require("./routes/sessions.router.js");
const userRouter = require("../src/routes/user.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const path = require("path");
require("./database.js");
//Midleware

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    //1) Memory Storage: 
    secret: "secretcoder",
    //Es el valor para firmar la cookie. 
    resave: true, 
    //Esta config me permite mantener la sesión activa frente a la inactividad del usuario. 
    saveUninitialized: true,    
    //3) Utilizando Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", 
        //ttl: 1000
    })

}))

//handlebars

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
//const ProductManager = require("../src/controllers/product-manager.js");
//const productManager = new ProductManager("./src/models/product.json");

//Login de usuario con Session: 

app.get("/login", (req, res) => {
    let usuario = req.query.usuario; 

    req.session.usuario = usuario; 
    res.send("Guardamos el usuario por medio de query");
})

//Verificamos el usuario: 

app.get("/usuario", (req, res) => {
    if(req.session.usuario) {
        return res.send(`El usuario registrado es el siguiente: 
        ${req.session.usuario}`);
    } 

    res.send("No tenemos un usuario registrado!");

})

// const MessageModel = require("./models/message.model.js");
// const io = new socket.Server(httpServer);

// io.on("connection", (socket) => {
//     console.log("Nuevo usuario conectado");

//     socket.on("message", async data => {

//         //Guardo el mensaje en MongoDB: 
//         await MessageModel.create(data);

//         //Obtengo los mensajes de MongoDB y se los paso al cliente: 
//         const messages = await MessageModel.find();
//         console.log(messages);
//         io.sockets.emit("message", messages);

//     })
// })

//Iniciamos el servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})