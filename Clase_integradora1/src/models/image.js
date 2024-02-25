const mongoose = require("mongoose");

const imagenShema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String
})

const ImagenModel = mongoose.model("imagenes", imagenShema);

module.exports = ImagenModel;