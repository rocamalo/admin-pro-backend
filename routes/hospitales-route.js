// / ruta   api/hospitales

const { check } = require('express-validator')
const { Router } = require('express');
const { getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital } = require('../controllers/hospitales-controller')
const { validarCampos } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getHospitales);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validarCampos
], crearHospital);

router.put('/:id', [
    validarJWT,
    check('nombre', 'Nombre requerido').not().isEmpty(),
    //check('role', 'Role requerido').not().isEmpty(),
    check('email', 'Email requerido').isEmail(),
    validarCampos
], actualizarHospital);

router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;