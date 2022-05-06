//Ruta: /api/usuarios

const { check } = require('express-validator')
const { Router } = require('express');
const { getUsuarios, createUsuario, actualizarUsuario, deleteUsuario } = require('../controllers/usuarios-controller')
const { validarCampos } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJWT, getUsuarios);

router.post('/',[
    check('nombre', 'Nombre requerido').not().isEmpty(),
    check('password', 'Password requerido').not().isEmpty(),
    check('email', 'Email requerido').isEmail(),
    validarCampos
] ,createUsuario);

router.put( '/:id', [
    validarJWT,
    check('nombre', 'Nombre requerido').not().isEmpty(),
    //check('role', 'Role requerido').not().isEmpty(),
    check('email', 'Email requerido').isEmail(),
    validarCampos
] ,actualizarUsuario);

router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router;