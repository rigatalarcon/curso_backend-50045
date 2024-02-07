const express = require("express");
const router = express.Router();

// array pets

const pets = [];
//rutas mascotas

router.get("/pets", (req, res) => {
    res.json(pets);
})

router.post("/", (req, res) => {
    const nuevaMascota = req.body;
    pets.push(nuevaMascota);
    res.send({status:"succes", message: "mascota creado correctamente"});
})

module.exports = router;
