const { response } = require("express");
const jwt = require("jsonwebtoken");
const contactos = require("./../models/contactos");

module.exports = {
  listar: (req, res) => {
    
    contactos.find({ status: 1, userId: req.user })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send("error");
      });

  },
  ver: (req, res) => {
    const id = req.params.id;
    contactos
      .findOne({ status: 1, _id: id, userId: req.user._id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send("error");
      });
  },
  getOneByName: (req, res) => {
    const nombre = req.params.nombre;
    contactos
      .find({ status: 1, nombre: nombre })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send(err, "error");
      });
  },
  getOneByCorreo: (req, res) => {
    const correo = req.params.correo;
    contactos
      .find({ status: 1, correo: correo })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send(err, "error");
      });
  },
  create: async (req, res) => {

    let data = req.body;

    data.userId = req.user._id;

    contactos.create(data).then((response) => {
      res.send(response);
    });
  },
  update: async (req, res) => {
    const id = req.params.id;
    let update = req.body;

    console.log("ID", id);
    console.log("UPDATE", update);

    await contactos
      .findByIdAndUpdate(id, update)
      .then((data) => {
        res.send(data);
      })
      .catch();
  },
  delete: (req, res) => {
    const id = req.params.id;
    contactos.findByIdAndDelete(id)
    .then((data)=>{
      res.send(data)
    })
    .catch()
  },
};
