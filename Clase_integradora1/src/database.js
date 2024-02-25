const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/CODEREST?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.log(error))
