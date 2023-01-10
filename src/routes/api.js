const express = require('express');
const router = require("express").Router();
const authMiddleware = require('../middlewares/auth')
const contactosController = require("./../controllers/contactos");
const usuariosController = require("./../controllers/usuarios");
//CONTACTOS
router.use('/contactos', authMiddleware);

router.get("/contactos", contactosController.listar);
router.get('/contactos/:id', contactosController.ver);
router.get('/contactos/nombre/:nombre', contactosController.getOneByName);
router.get('/contactos/correo/:correo', contactosController.getOneByCorreo);
router.post('/contactos', authMiddleware, express.json() ,contactosController.create );
router.put('/contactos/update/:id', express.json(), contactosController.update);
router.delete('/contactos/delete/:id', contactosController.delete);

//USUARIOS
router.post('/registro', express.json(), usuariosController.registro);
router.post('/login', express.json(), usuariosController.login)

module.exports = router;
