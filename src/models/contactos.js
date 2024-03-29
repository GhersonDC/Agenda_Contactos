const { Schema, model } = require("mongoose");

const contactoSchema = new Schema({
    nombre: {type:String},
    telefono: {type:String, default: "000"},
    correo: {type:String},
    status: {type:Number, default: 1},
    userId: {type:String },
    photoUrl: {type:String},
});

module.exports = model('contactos', contactoSchema);
