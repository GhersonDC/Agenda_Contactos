const express = require("express");

const mongoose = require("mongoose");

const apiRoutes = require("./src/routes/api");

const {engine} = require('express-handlebars');

// const bodyParser = require('body-parser');


const app = express();

// app.use(express.urlencoded);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',  __dirname + '/src/views');

require('dotenv').config();

const uri = process.env.MONGODB;


app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); //para enviar en el body en toda la app en lugar de cada ruta que lo requiera
app.use(apiRoutes);

app.use('/fotos', express.static(__dirname + '/uploads/images'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('',(req,res)=>{
    // res.sendFile(__dirname + '/src/views/index.html');
    res.render('index');
})

const port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);

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
