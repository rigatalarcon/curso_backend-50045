const express = require("express"); 
const router = express.Router();
const products = [];


const ProductManager = require("../controllers/product-manager")
const productManager = new ProductManager("./src/models/productos.json");

router.get("/", async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        const limit = req.query.limit;
        const limitnumber = limit? parseInt(limit) : undefined;
        if(limitnumber && !isNaN(limitnumber)) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error del servidor" });
    }
})
router.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const producto = await productManager.getProductById(parseInt(id));
        
        if (!producto) {
            res.json({error: "Producto no encontrado"});
        } else {
            res.json(producto);
        }

    } catch (error) {
        console.log("Error al obtener el producto", error);
        res.status(500).json({ error: "Error del servidor" });
    }
})

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    products.push(nuevoProducto);
    console.log(nuevoProducto);

    try {
        await productManager.addProduct(nuevoProducto),
        res.status(201).json({message: "Producto agregado exitosamente"});
    } catch (error) {
        console.log("error al agregar un producto ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

router.put("/:pid", async (req, res) => {
    let id = req.params.pid; 
    const productoActualizado = req.body; 

    try {
        await productManager.updateProduct(parseInt(id), productoActualizado);
        res.json({message: "Producto actualizado correctamente"});
    } catch (error) {
        console.log("No se pudo actualizar el producto ", error); 
        res.status(500).json({error: "Error del server"});
    }
} )

router.delete("/:id", async (req, res) => {
    let id = req.params.pid;
    const productoBorrado = req.body;

    try {
        await productManager.deleteProduct(parseInt(id), productoBorrado);
        res.json({message: "Producto eliminado correctamente", error})
        
    } catch (error) {
        console.log("No se pudo borar el producto ", error); 
        res.status(500).json({error: "Error del server"});
        
    }
})


module.exports = router; 