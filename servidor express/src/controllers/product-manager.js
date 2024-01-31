const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock, category, status, thumnails, id }) {

        if (!title || !description || !price || !img || !code || !stock || !category || !status || !thumnails || !id) {
            console.log("todos los campos son obligatorios");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("el codigo debe ser unico");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status,
            thumnails,
            id,
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }

    async getProducts() {
        await this.leerArchivo();
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            console.error("producto no encontrado");
        } else {
            console.log(product);
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("error al leer archivo", error)

        }
    }
    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));

        } catch (error) {
            console.log("error al leer archivo", error);

        }
    }
    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products[index] = { ...this.products[index], ...updatedFields };
        return this.products[index];
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Producto no borrado correctamente');
        }

        // Eliminar producto
        const deletedProduct = this.products.splice(index, 1)[0];
        return deletedProduct;
    }
}

module.exports = ProductManager;

