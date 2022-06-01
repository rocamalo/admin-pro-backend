const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');

const borrarImage = ( path ) => {
    if (fs.existsSync(path)) { //si existe ya una imagen, borrala
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tabla, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tabla) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('Medico con ese id no existe');
                return false;
            }
             pathViejo = `./upload/medicos/${medico.imagen}`;
            borrarImage(pathViejo);
            medico.imagen = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Hospital con ese id no existe');
                return false;
            }
            pathViejo = `./upload/hospitales/${hospital.imagen}`;
            borrarImage(pathViejo);
            hospital.imagen = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('Usuario con ese id no existe');
                return false;
            }
            pathViejo = `./upload/usuario/${usuario.imagen}`;
            borrarImage(pathViejo);
            usuario.imagen = nombreArchivo;
            await usuario.save();
            return true;
            break;

        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}