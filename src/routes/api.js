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
        let nombre = new Date().getTime() + '.jpg';
        callback(null, nombre);
    },
}; //)

const multerStorage = multer.diskStorage(storage);

const upload = multer({ storage: multerStorage})

//CONTACTOS
router.use('/contactos', authMiddleware);

router.get("/contactos", contactosController.listar);
router.get('/contactos/:id', contactosController.ver);
router.get('/contactos/nombre/:nombre', contactosController.getOneByName);
router.get('/contactos/correo/:correo', contactosController.getOneByCorreo);
router.post('/contactos', express.json(), upload.single('foto') , contactosController.crear );
router.put('/contactos/update/:id', express.json(), contactosController.update);
router.delete('/contactos/delete/:id', contactosController.delete);

//USUARIOS
router.post('/registro', express.json(), usuariosController.registro);
router.post('/login', express.json(), usuariosController.login)

module.exports = router;
