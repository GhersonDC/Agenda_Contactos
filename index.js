const express = require("express");

const mongoose = require("mongoose");

const apiRoutes = require("./src/routes/api");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(apiRoutes);

const port = 3000;

const uri =
  "mongodb+srv://usuario_prubea:gherson23@cluster0.fvnd7.mongodb.net/db_contactos?retryWrites=true&w=majority";

mongoose.connect(uri, (err) => {
  if (err) {
    console.log("conexion fallida");
  } else {
    console.log("conexion correcta");
    app.listen(port, () => {
      console.log("App is running on port " + port);
    });
  }
});

app.get("", (req, res) => {
  res.send("api works!");
});
