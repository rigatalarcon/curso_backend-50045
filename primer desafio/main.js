class ProductManager {

    static ultId = 0;

    constructor () {
        this.products = [];
    }
    

    addProduct(title , description, price, img, code, stock) {

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

    }

    getProducts(){
        return this.products;
    }

    getProductsById(id) {
        const product = this.products.find(item => item.id === is);

        if(!product) {
            console.error("Not Found");
        } else {
            console.log(product);
        }
    }
}

//testing

const manager = new ProductManager();

console.log(manager.getProducts());

manager.addProduct("producto prueba" , "esto es un pruducto a prueba", 100, "sin imagen", "abc123", 15);

manager.addProduct("yerba" , "yerba mate suave", 200, "sin imagen", "abc124", 10);

manager.addProduct("azucar" , "la mas dulce", 300, "sin imagen", "abc125", 20);

console.log(manager.getProducts());

console.log("verificamos si hay azucar:");
manager.getProductsById(30);

