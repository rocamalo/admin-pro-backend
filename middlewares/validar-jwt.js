const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    console.log(token)
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {
        console.log(process.env.JWT_KEY)
        const { uid } = jwt.verify( token, process.env.JWT_KEY);

        console.log(uid);

        //si quisiera obtener el uid del usuario que hizo la peticion, del token lo obtengo de la peticion
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'token invalido',
            error
        })
    }

    
}

module.exports = {
    validarJWT
}