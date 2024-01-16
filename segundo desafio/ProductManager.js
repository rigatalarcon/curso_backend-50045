const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock }) {

        if (!title || !description || !price || !img || !code || !stock) {
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
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }

    async getProducts() {
        await this.leerArchivo();
    }

    getProductsById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            console.error("Not Found");
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
            throw new Error('Producto no encontrado');
        }

        // Eliminar producto
        const deletedProduct = this.products.splice(index, 1)[0];
        return deletedProduct;
    }
}

//testing

// Pruebas
const productManager = new ProductManager();

// Prueba 1
const productsEmpty = productManager.getProducts();
console.log(productsEmpty); // []

// Prueba 2
const addedProduct = productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
});
console.log(addedProduct);

// Prueba 3
const productsAfterAdd = productManager.getProducts();
console.log(productsAfterAdd);

// Prueba 4
const productById = productManager.getProductById(addedProduct.id);
console.log(productById);

// Prueba 5
const updatedProduct = productManager.updateProduct(addedProduct.id, { price: 250 });
console.log(updatedProduct);

// Prueba 6
const deletedProduct = productManager.deleteProduct(addedProduct.id);
console.log(deletedProduct);
