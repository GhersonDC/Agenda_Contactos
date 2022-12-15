const modelo = require("./../models/usuario");

module.exports = {
  login: (req, res) => {},
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
