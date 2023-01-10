const modelo = require("./../models/usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: (req, res) => {
    const data = req.body;
    const credenciales = {
      correo: data.correo,
      password: data.password,
    };

    modelo.findOne(credenciales)
      .then((response) => {
        if (response) {
          const { _id, nombre } = response;
          const token = jwt.sign({ _id, nombre, correo }, process.env.SECRET);
          res.send(token);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  },
  registro: (req, res) => {
    const datos = req.body;
    modelo
      .create(datos)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  },
};
