const express = require("express");
const app = express();
const PUERTO = 8080;
app.use(express.json());

const ProductManager = require("./controllers/ProductManager");
const productManager = new ProductManager("./models/productos.json");

app.get("/api/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error del servidor" });
    }
})

app.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
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

app.post("/api/products", async (req, res) => {
    const nuevoProducto = req.body; 
    console.log(nuevoProducto);

    try {
        await productManager.addProduct(nuevoProducto),
        res.status(201).json({message: "Producto agregado exitosamente"});
    } catch (error) {
        console.log("error al agregar un producto ", error);
        res.status(500).json({error: "error del servidor"});
    }
})

app.put("/api/products/:pid", async (req, res) => {
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

app.delete("/api/products/:id", async (req, res) => {
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
app.listen(PUERTO);