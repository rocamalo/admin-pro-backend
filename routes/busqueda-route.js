const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { buscarTermino, buscarTerminoPorColeccion } = require('../controllers/busqueda-controller')

const router = Router();


router.get('/:termino', validarJWT, buscarTermino);
router.get('/coleccion/:tabla/:termino', validarJWT, buscarTerminoPorColeccion);


module.exports = router;