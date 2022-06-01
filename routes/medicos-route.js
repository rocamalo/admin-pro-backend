// / ruta   api/medicos

const { check } = require('express-validator')
const { Router } = require('express');
const { getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico } = require('../controllers/medicos-controller')
const { validarCampos } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getMedicos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('idHospital', 'idHospital es requerido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id', [
    validarJWT,
    check('nombre', 'Nombre requerido').not().isEmpty(),
    //check('role', 'Role requerido').not().isEmpty(),
    check('email', 'Email requerido').isEmail(),
    validarCampos
], actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;