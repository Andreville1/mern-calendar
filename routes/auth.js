/*
    Rutas de Usuarios / Auth
    host + /api/auth
    Ejemplos:
    host + /api/auth + /new
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { loginUsuario, crearUsuario, revalidarToken } = require('../controllers/auth'); // crearUsuario es una referencia a la función
const { validarJWt } = require('../middlewares/validar-jwt');

const router = Router();

// Los post deben recibir información
router.post(
    '/',
    [ // Colección de middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength( {min: 6} ),
        validarCampos
    ], 
    loginUsuario
);

router.post(
    '/new',
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength( {min: 6} ),
        validarCampos
    ],
    crearUsuario
);

router.get(
    '/renew',
    validarJWt, 
    revalidarToken
);

module.exports = router;