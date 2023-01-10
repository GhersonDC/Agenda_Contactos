const express = require("express");

const mongoose = require("mongoose");

const apiRoutes = require("./src/routes/api");

require('dotenv').config();

const uri = process.env.MONGODB;

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); //para enviar en el body en toda la app en lugar de cada ruta que lo requiera
app.use(apiRoutes);

const port = process.env.PORT || 3000;

mongoose.connect(uri, (err) => {
  if (err) {
    console.log("conexion fallida");
  } else {
    console.log("conexion correcta");
    app.listen(port, () => {
      if (process.env.NODE_ENV === "local") {
        console.log("App is running on LOCAL port " + port);
      } else {
        console.log("App is running on PROD port " + port);
      }
    });
  }
});

app.get("", (req, res) => {
  res.send("api works!");
});
