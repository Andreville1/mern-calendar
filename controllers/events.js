const { response } = require("express");
const Evento =  require('../models/Evento');

const getEventos = async(req, res = response) => {
    // Mongoose
    const eventos = await Evento.find()
        .populate('user', 'name') // Al hacer el .populate de user, lo que
                                  // hace es buscar en la colección de
                                  // donde venga ese ID y trae la 
                                  // información que contenga el ID
                    

    res.json({ 
        ok: true,
        eventos: eventos
    })
};

const crearEvento = async(req, res = response) => {
    //console.log(req.body)

    const evento = Evento(req.body)

    try {
        // Modifica del evento el user (que estaba vacio) y le coloca el id del user que creó el evento
        evento.user = req.uid 

        const eventoGuardado = await evento.save() // Mongoose

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

const actualizarEvento = async(req, res = response) => {
    const eventoId = req.params.id // Obtener el ID del URL
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId) // Mongoose

        if (evento) {
            if (evento.user.toString() !== uid) { // evento.user = id del usuario
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio para editar este evento'
                })
            }

            const nuevoEvento = {
                ...req.body,
                user: uid
            }
            // Por defecto envia el evento antiguo, hay que colocarle el tercer parametro para que retorne el nuevo
            const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true}) // Mongoose

            return res.json({
                ok: true,
                evento: eventoActualizado
            })
        }

        res.status(404).json({
            ok: false, 
            msg: 'Evento no existe por ese ID'
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

const eliminarEvento = async(req, res = response) => {
    const eventoId = req.params.id // Obtener el ID del URL
    const uid = req.uid

    try {
        // Busca en la base de datos el evento
        const evento = await Evento.findById(eventoId) // Mongoose

        if (evento) {
            if (evento.user.toString() !== uid) { // evento.user = id del usuario
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio para eliminar este evento'
                })
            }

            const eventoEliminado = await Evento.findByIdAndDelete(eventoId) // Mongoose

            return res.status(200).json({
                ok: true,
                evento: eventoEliminado
            })
        }

        res.status(404).json({
            ok: false, 
            msg: 'Evento no existe por ese ID'
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};