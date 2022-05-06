const { response } = require('express');//allows to have autocomplete, like typescript
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email role google'); //defines which propierties to send back in response
    res.json({
        ok: true,
        usuarios
    })

};

const createUsuario = async (req, res = response) => {

    const { email, password } = req.body; //here we destructuring the body to access its properties internally
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya tomado'
            })
        }
        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const usuarioDB = await usuario.save();

        //generate jwt
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error check logs'
        })
    }
};

const actualizarUsuario = async (req, res = response) => {

    try {
        const uid = req.params.id;

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        //TODO validar token y comprobar si es el usuario correcto
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== req.body.email) {
            const existeEmail = await Usuario.findOne({ email: req.body.email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'email tomado'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            msg: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const deleteUsuario = async (req, res = response) => {

    const uid = req.params.id;
    
    try {
        const usuarioDB = Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario con ese id no encontrado'
            })
        }

        await Usuario.findByIdAndDelete(req.params.id);
        res.json({
            ok: true,
            uid
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    actualizarUsuario,
    deleteUsuario
}