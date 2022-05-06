const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async ( req, res=response ) => {


    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            })
        }

        //validar password desencriptado con la encriptada
        const validPassword = bcrypt.compareSync( password, usuarioDB.password )
        if (!validPassword){
            return res.json({
                ok: false,
                msg: 'Password not valid'
            })
        }

        //generar webtoken
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            msg: 'logged in',
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error en login'
        })
    }
}

module.exports = {
    login
}