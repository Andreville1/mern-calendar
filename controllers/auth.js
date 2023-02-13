const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async(req, res = response) => { // response es para el autocompletado 
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne( {email: email} ) // Busca en la BD si ese correo existe
        
        if (usuario) {
            // Confirmar los passwords
            const validPassword = bcrypt.compareSync(password, usuario.password) 
        
            if (!validPassword) { // Si las contraseñas no son iguales
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto'
                })
            }

            // Generar el JWT
            const token = await generarJWT(usuario.id, usuario.name)

            return res.json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token: token
            })
        }

        res.status(400).json({
            ok: false,
            msg: 'El usuario no existe con ese email'
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

};

const crearUsuario =  async(req, res = response) => {
    //console.log(req.body)
    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne( {email: email} ) // Busca en la BD si ese correo existe
        //console.log(usuario)

        if (usuario) {
            res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            })
        }

        usuario = new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
        
        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name)
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const revalidarToken = async(req, res = response) => {
    // El uid y name en esta parte ya fueron sobreescritos
    const { uid, name } = req

     // Generar el JWT
     const token = await generarJWT(uid, name)

    // Retornar JWT
    res.json({
        ok: true,
        /*uid: uid,
        name: name,*/
        token: token
    })
}

module.exports = {
    loginUsuario: loginUsuario,
    crearUsuario: crearUsuario,
    revalidarToken: revalidarToken
}