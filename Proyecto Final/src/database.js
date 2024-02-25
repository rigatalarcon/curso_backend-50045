const mongoose  = require("mongoose");

mongoose.connect("mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/ecommerce")
    .then(() => console.log("conexion exitosa"))
    .catch(()=> console.log("error"))

