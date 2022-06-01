const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImagen } = require('../controllers/upload-controller')
const expressfileUpload = require('express-fileupload');

const router = Router();

// default options middleware
router.use(expressfileUpload());


router.put('/:tabla/:id', validarJWT, fileUpload);
router.get('/:tabla/:foto', validarJWT, getImagen);


module.exports = router;