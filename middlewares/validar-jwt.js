const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWt = (req, res = response, next) => {
    // El token se obtiene de los headers (x-token)
    const token = req.header('x-token')
    //console.log(token)
    
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    // Validar JWT
    try {
        const {uid, name} = jwt.verify( // payload = {uid, name}
            token, 
            process.env.SECRET_JWT_SEED
        )
        //console.log(payload)

        // Esto modifica el req para todo el backend
        req.uid = uid
        req.name = name

    } catch (error) { // Si la validación del token falla
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
};

module.exports = {
    validarJWt
};