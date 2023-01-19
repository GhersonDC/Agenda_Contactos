const express = require('express');
const router = express.Router();
const multer = require('multer');

const authMiddleware = require('../middlewares/auth')
const contactosController = require("./../controllers/contactos");
const usuariosController = require("./../controllers/usuarios");

const storage = { //multer.diskStorage(
    destination : (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        // let nombre = new Date().getTime() + '.jpg';
        const nombre = `${req.userId._id}-${new Date().getTime()}.${extension}`; //revisar y preguntar el porque se nombro como user en lugar de userId
        callback(null, nombre);
    },
}; //)
function filter(req,file,callback){

    const isValid = file.mimetype == 'image/jpeg';

    callback(null, isValid);
}
const multerStorage = multer.diskStorage(storage);

const upload = multer({ storage: multerStorage, fileFilter: filter})

//CONTACTOS
router.use('/contactos', authMiddleware);

router.get("/contactos", contactosController.listar);
router.get('/contactos/:id', contactosController.ver);
router.get('/contactos/nombre/:nombre', contactosController.getOneByName);
router.get('/contactos/correo/:correo', contactosController.getOneByCorreo);
router.post('/contactos', express.json(), upload.single('foto') , contactosController.crear ); //parametro foto para buscarlo
router.put('/contactos/update/:id', express.json(), contactosController.update);
router.delete('/contactos/delete/:id', contactosController.delete);

//USUARIOS
router.post('/registro', express.json(), usuariosController.registro);
router.post('/login', express.json(), usuariosController.login)
router.get('/registro', usuariosController.formRegistro);

//FOTOS
// router.get('/fotos/:param', (req,res)=>{ //param is a setted value here
//     const path = __dirname + '../../uploads/' + req.params.param; //reuse param name in route
//     res.sendFile(path);
//     console.log(path);
// });
module.exports = router;
