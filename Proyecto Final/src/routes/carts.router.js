const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager");
const cartManager = new CartManager("./src/models/cart.json");


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.status(201).json(nuevoCarrito({ message: "Carrito agregado exitosamente" }));
    } catch (error) {
        console.log("error al agregar el carrito ", error);
        res.status(500).json({ error: "error del servidor" });
    }
})

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const cart = await productManager.getCarritoById(parseInt(cartId));
        if (!cart) {
            res.json({ error: "carrito no encontrado" });
        } else {
            res.json(cart);
        }

    } catch (error) {
        console.log("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error del servidor" });
    }
})

router.post("/:cid/product/:pid", async (req, res) => {

    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = 1;

    try {
        const actualizarcart = await cartManager.addProductoACarrito(cartId, productId, quantity);
        res.json(actualizarcart.products);

    } catch (error) {
        console.log("Error al agregar productos en el carrito", error);
        res.status(500).json({ error: "Error del servidor" })
    }
})


module.exports = router; 