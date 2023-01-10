const { Schema, model } = require("mongoose");

const schema = new Schema({
    nombre: {type:String, required: true},
    correo: {type:String, required: true},
    password: {type:String, required: true},
    status: {type:Number, default: 1},
    userId: {type: String},
});

module.exports = model('usuarios', schema);