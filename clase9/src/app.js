//armado de sever

const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("view", "./view")

app.get("/plantilla", (req , res) => {
    res.render("hola", {titulo: "hola"});

})

app.get("/contacto", (req , res) => {
    res.render("contacto");

})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})