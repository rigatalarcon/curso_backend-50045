const express = require("express");
const router = express.Router(); 
const ImagenModel = require("../models/image.js");
const { title } = require("process");
const fs = require("fs").promises;

//Ruta raiz de la aplicacion
router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find();

    const nuevoArrayImagenes = imagenes.map(imagen => {
        return{
            id: imagen._id,
            title: imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    })

    res.render("index", {imagenes: nuevoArrayImagenes});
})


router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find(); 

    const nuevoArrayImagenes = imagenes.map(imagen => {
        return {
            id: imagen._id,
            title: imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    })

    res.render("index", {imagenes: nuevoArrayImagenes});
    
})
router.get("/upload", (req, res) => {
    res.render("upload");
})

router.post("/upload", async (req, res) => {
    try {
        const imagen = new ImagenModel(); 
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/img/" + req.file.filename;
        
        await imagen.save();

        res.redirect("/");
    } catch (error) {
        res.status(500);
    }
})

router.get("/image/:id/delete", async (req, res) => {
    const {id} = req.params;
    const imagen = await ImagenModel.findByIdAndDelete(id);
    await fs.unlink("./src/public" + imagen.path);
    res.redirect("/");
})

module.exports = router; 