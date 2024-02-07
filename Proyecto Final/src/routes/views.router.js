const express = require("express");
const router = express.Router(); 
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("../models/productos.json");



router.get("/", async(req, res) => {
    try {
        const productos = await productManager.getProducts(); 
        res.render("home", {productos: productos})

    } catch (error) {
        console.log("error al obtener nuestros productos", error);
        res.status(500).json({errors:"Error interno del servidor"});
    }
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.log("error en vista real time", error);
        res.status(500).json({errors:"Error interno del servidor"});
        
    }
});

    

module.exports = router; 
