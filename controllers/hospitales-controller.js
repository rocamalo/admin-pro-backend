const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res=response) => {

    
    try {
        const hospitales = await Hospital.find()
        .populate('usuario', 'nombre email img')
        res.json({
            ok: true,
            hospitales: hospitales
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Interla server error'
        })
    }
    
}

const crearHospital = async (req, res=response) => {
    const uid = req.uid; //viene de la validadcion del JWT

    const hospital = new Hospital ({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error internal server'
        })
    }
    
}

const actualizarHospital = async (req, res=response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            })
        }

        const cambiosHospital = {
           ...req.body,
           usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })

        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            hospitalActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error check logs"
        })
    }
    
}

const borrarHospital = async (req, res=response) => {
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            })
        }

        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Hospital Deleted'
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error'
        })
    }

}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}