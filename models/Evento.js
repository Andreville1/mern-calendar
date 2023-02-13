const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId, // Esto indica que es una referencia
        ref: 'Usuario', // Este indica el otro modelo (esquema)
        required: true
    }
});

EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id // Lo renombra
    return object
});

// Para crear el nombre de la carpeta donde se guarda la información en 
// la BD se base en el nombre que se le da al modelo
module.exports = model('Evento', EventoSchema);