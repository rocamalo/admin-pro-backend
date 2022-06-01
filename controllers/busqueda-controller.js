const { response, json } = require('express');//allows to have autocomplete, like typescript

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const buscarTermino = async (req, res = response) => {

    const termino = req.params.termino; //here we destructuring the body to access its properties internally
    const regexp = new RegExp(termino, 'i'); //se manda el termino de busqueda y la i es de insensible, osea toma en cuenta todo
    // const usuarios = await Usuario.find({ 
    //     nombre: regexp
    // });

    // const medicos = await Medico.find({ 
    //     nombre: regexp
    // });

    // const hospitales = await Hospital.find({ 
    //     nombre: regexp
    // });
    try {

        const [usuarios, medicos, hospitales] = await Promise.all([
             Usuario.find({ 
                nombre: regexp
            }).limit(5).sort({ nombre: 'asc' }),
             Medico.find({ 
                nombre: regexp
            }).limit(5),
             Hospital.find({ 
                nombre: regexp
            }).limit(5) 
        ])
        
        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error check logs'
        })
    }
};

const buscarTerminoPorColeccion = async (req, res = response) => {

    const termino = req.params.termino; //here we destructuring the body to access its properties internally
    const tabla = req.params.tabla
    const regexp = new RegExp(termino, 'i'); //se manda el termino de busqueda y la i es de insensible, osea toma en cuenta todo
    let resultado = [];
    try {
        switch (tabla) {
            case 'usuarios':
                 resultado = await Usuario.find({ 
                    nombre: regexp
                }).limit(5).sort({ nombre: 'asc' })
                break;
            case 'medicos':
                resultado = await Medico.find({ 
                    nombre: regexp
                })
                .populate('usuario', 'nombre imagen')
                .populate('hospital', 'nombre imagen')
                .limit(5)
                break;
            case 'hospitales':
                resultado = await Hospital.find({ 
                    nombre: regexp
                })
                .populate('usuario', 'nombre imagen')
                .limit(5) 
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Tabla no encontrada'
                })
        }
 
        res.json({
            ok: true,
            resultado
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error check logs'
        })
    }
};


module.exports = {
    buscarTermino,
    buscarTerminoPorColeccion
}