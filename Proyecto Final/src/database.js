const mongoose  = require("mongoose");

mongoose.connect("mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("conexion exitosa"))
    .catch(()=> console.log("error"))

