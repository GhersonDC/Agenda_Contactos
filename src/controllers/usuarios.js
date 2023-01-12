const modelo = require("./../models/usuario");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require("dotenv").config();

function hashPassword(pwd){
  return crypto.scryptSync(pwd, 'salt', 24);
}

module.exports = {
  login: (req, res) => {
    const data = req.body;

    const credenciales = {
      correo: data.correo,
      password: hashPassword(data.password),
    };

    modelo.findOne(credenciales).then((response) => {

        if (response) {
          
          const { _id, nombre, correo } = response; //faltaba el correo para login correcto
          const token = jwt.sign({ _id, nombre, correo }, process.env.SECRET);
          res.send({token, nombre, correo});

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

    const hashedPassword = hashPassword(datos.password);

    datos.password = hashedPassword;

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
