const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Para crear el nombre de la carpeta donde se guarda la información en 
// la BD se base en el nombre que se le da al modelo
module.exports = model('Usuario', UsuarioSchema);