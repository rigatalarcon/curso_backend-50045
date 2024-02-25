const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const multer = require("multer");
const imagenRouter = require("./routes/imagen.router.js")
const PUERTO = 8080;

require("../src/database.js");

//Expre-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//MIDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./src/public/img");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})
app.use(multer({storage}).single("image"));

//Routes
app.use("/", imagenRouter)


app.listen(PUERTO, () => {
    console.log(`servidor en http://localhost:${PUERTO}`)
})
