const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/updateImage');
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res = response) => {

    const tabla = req.params.tabla;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    if (!tiposValidos.includes(tabla)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tabla no valida'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Formato de imagen no valido'
        });
    }

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    //path
    const path = `./upload/${tabla}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //update in bd
        actualizarImagen(tabla, id, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Image uploaded',
            nombreArchivo
        });
    });

    
}

const getImagen = (req, res) => {
    const tabla = req.params.tabla;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../upload/${tabla}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const noImagePath = path.join( __dirname, '../upload/no-img.jpg');
        res.sendFile(noImagePath);
    }
    
}



module.exports = {
    fileUpload,
    getImagen
}