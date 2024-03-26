
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PUERTO = 8080;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const initializePassport = require("./config/passport.config.js")
require("./database.js");

//Midleware
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();


//Express-Handlebars

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas

app.use("/", viewsRouter);
app.use("/", userRouter);


//Login de usuario con Session: 

app.get("/login", (req, res) => {
    res.send("Funciona");
})



//Iniciamos el servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO} `);
})