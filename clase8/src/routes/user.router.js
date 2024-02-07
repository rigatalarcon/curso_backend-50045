const express = require("express");
const router = express.Router();

//array usuarios.

const users = [];

//rutas usuarios

router.get("/", (req, res) => {
    res.json(users);
})

router.post("/", (req, res) => {
    const nuevoUsuario = req.body;
    users.push(nuevoUsuario);
    res.send({status:"succes", message: "usuario creado correctamente"});
})

module.exports = router;