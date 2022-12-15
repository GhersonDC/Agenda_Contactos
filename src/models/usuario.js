const { Schema, model } = require("mongoose");

const schema = new Schema({
    nombre: {type:String},
    correo: {type:String},
    password: {type:String},
    status: {type:Number, default: 1},
});

module.exports = model('usuarios', schema);