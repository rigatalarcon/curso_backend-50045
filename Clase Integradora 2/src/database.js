const mongoose  = require("mongoose");

mongoose.connect("mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/CoderBase?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a CoderBase"))
    .catch(()=> console.log("Error al conectarse a CoderBase"))

