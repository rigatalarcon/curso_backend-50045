const fs = require ("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor (path) {
        this.products = [];
        this.path = path;
    }
    
    async addProduct({title , description, price, img, code, stock}) {

        if(!title || !description || !price || !img || !code || !stock){
            console.log ("todos los campos son obligatorios");
            return;
        }

        if(this.products.some(item => item.code === code)){
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

    async getProducts(){
        await this.leerArchivo();
    }

    getProductsById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.error("Not Found");
        } else {
            console.log(product);
        }
    }

    async leerArchivo () {
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
            console.log ("error al leer archivo", error);
            
        }
    }
}

//testing

const manager = new ProductManager();

console.log(manager.getProducts());

manager.addProduct("producto prueba" , "esto es un producto a prueba", 100, "sin imagen", "abc123", 15);

manager.addProduct("yerba" , "yerba mate suave", 200, "sin imagen", "abc124", 10);

manager.addProduct("azucar" , "la mas dulce", 300, "sin imagen", "abc125", 20);

console.log(manager.getProducts());

console.log("verificamos si hay azucar:");
manager.getProductsById(30);

