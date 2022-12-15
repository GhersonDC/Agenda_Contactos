const { response } = require("express");
const contactos = require("./../models/contactos");

module.exports = {
  getAll: (req, res) => {
    contactos
      .find({ status: 1 })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send("error on getall");
      });
  },
  getOneById: (req, res) => {
    const id = req.params.id;
    contactos
      .findOne({ status: 1, _id: id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send("error on id");
      });
  },
  getOneByName: (req, res) => {
    const nombre = req.query.nombre;
    contactos
      .find({ status: 1, nombre: nombre })
      .then((data) => {
        res.send(OK);
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
    const data = req.body;

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
      .findByIdAndUpdate(id, update, { new: true })
      .then((data) => {
        res.send(data);
      })
      .catch();
  },
  softdelete: (req, res) => {
    const id = req.params.id;
    const status = { status: 0 };
    contactos
      .findByIdAndUpdate(id, status, { new: true })
      .then((data) => {
        res.send(data);
      })
      .catch();
  },
};
