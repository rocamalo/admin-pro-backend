// route /api/login

const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth-controller');
const { renewToken } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.post('/', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],
    login
)

router.get('/renew', [
    validarJWT,
    renewToken
],
    login
)




module.exports = router;