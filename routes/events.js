const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWt } = require("../middlewares/validar-jwt");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");

/*
    Rutas de Eventos / Events
    host + /api/events
*/

const router =  Router();

// Validar JWT
router.use(validarJWt) // Cualquier petición que este abajo, debe tener su token (por la validación)

// Obtener eventos
router.get(
    '/', 
    getEventos  
);

// Crear eventos
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualizar eventos
router.put(
    '/:id', 
    actualizarEvento
);

// Actualizar eventos
router.delete(
    '/:id', 
    eliminarEvento
);

module.exports = router;