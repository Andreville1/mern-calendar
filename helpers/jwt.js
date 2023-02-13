const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => { // Los parametros son lo que se va a enviar en el payload
    return new Promise( (resolve, reject) => {
        // Crear el payload
        const payload = {uid, name}

        // Generar el token
        jwt.sign(
            payload, 
            process.env.SECRET_JWT_SEED, 
            {
                expiresIn: '2h'
            }, 
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('No se pudo generar el token')
                }

                resolve(token)
            }
        )
    })
};

module.exports = {
    generarJWT
};