const express = require('express');
const router = require("express").Router();
const contactosController = require("./../controllers/contactos");

// contactos

router.get("/contactos", contactosController.getAll);
router.get('/contactos/:id', contactosController.getOneById);
router.get('/contactos:nombre', express.json(), contactosController.getOneByName);
router.get('/contactos/correo/:correo', contactosController.getOneByCorreo);

router.post('/contactos', express.json() ,contactosController.create );
router.put('/contactos/:id/update', express.json(), contactosController.update);
router.put('/contactos/:id/delete', express.json(), contactosController.softdelete);

module.exports = router;
