//const { promises } = require("stream").promises;

const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.lastId = 0;
        
        this.cargarCarritos();
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf8")
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {

                this.lastId = Math.max(...this.carts.map(cart => cart.id));

            }
        } catch (error) {
            console.log("Error al cargar los carritos desde el archivo", error);

            await this.guardarCarritos();
        }
    }

    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.lastId,
            products: []
        };

        this.carts.push(nuevoCarrito);
        await this.guardarCarritos();
        return nuevoCarrito;
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await this.carts.find(c => c.id === cartId);

            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`)
            }
            return carrito;
        } catch (error) {
            console.log("Error al obtener carrito por ID", error);
            throw error;
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        const carrito = await this.getCarritoById(cartId);
        const existeProducto = carrito.products.find(p => p.product === productId);

        if (existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({ product: productId, quantity });
        }
        await this.guardarCarritos();
        return carrito;
    }
}

module.exports = CartManager;