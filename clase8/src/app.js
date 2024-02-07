const express = require("express");
const app = express();
const PUERTO = 8080;

const petsRouter = require("./routes/pets.router");
const userRouter = require("./routes/user.router");

//router
app.use("/api/users", userRouter);
app.use("/api/pets", petsRouter);

//decir a al app que vamos a trabajar con datos json.

//creamos el midleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//no olvidar el listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})


// sevcios de archivos estaticos.
app.use( express.static("./public"));


//express nos permite tenr archvos estaticos como html, css, img, etc. todos ´pueden acceder, y los vamos a crear en la carpeta public.

const multer = require("multer");

//Si queremos que los archivos se guarden en la carpeta correcta, con formato y el nombre original, tenemos que configurar un storage: 
//En el storage vamos a configurar dos propiedades: destination y filename. Como y donde se van a guardar los archivines.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
        //carpeta donde se guardan las img.
    },
    filename: (req, file, cb)=> {
      cb(null, file.originalname);
        //mantengo el nombre original.
    }
})


const upload = multer({storage: storage});
//configuramos donde se van a guardar los los archivos que suba el cliente.

app.post("/upload", upload.single("imagen"), (req, res) => {
    res.send("imagen cargada");
})




