const express = require('express');
const router = require("express").Router();
const contactosController = require("./../controllers/contactos");
const usuariosController = require("./../controllers/usuarios");

router.get("/contactos", contactosController.getAll);
router.get('/contactos/:id', contactosController.getOneById);
router.get('/contactos/nombre/:nombre', contactosController.getOneByName);
router.get('/contactos/correo/:correo', contactosController.getOneByCorreo);

router.post('/contactos', express.json() ,contactosController.create );
router.put('/contactos/update/:id', express.json(), contactosController.update);
router.delete('/contactos/delete/:id', contactosController.delete);

//USUARIOS
router.post('/registro', express.json(), usuariosController.registro);

module.exports = router;
