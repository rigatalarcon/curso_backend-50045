const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("../src/routes/products.router.js")
const cartsRouter = require("../src/routes/carts.router.js")


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO);