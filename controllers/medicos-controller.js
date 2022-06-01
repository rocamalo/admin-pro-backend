const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res=response) => {

    try {
        const medicos = await Medico.find()
        .populate('usuario', 'nombre email imagen')
        .populate('hospital', 'nombre imagen')

        res.json({
            ok: true,
            medicos: medicos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Check logs'
        })
    }
    
}

const crearMedico = async (req, res=response) => {

    const uid = req.uid; //viene de la validadcion del JWT
    const hospitalID = req.body.idHospital;
    const name = req.body.nombre;
    const medico = new Medico ({
        usuario: uid,
        hospital: hospitalID,
        nombre: name
    });

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Check logs'
        })
    }
}

const actualizarMedico = async (req, res=response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'medico not found'
            })
        }

        const cambiosMedico = {
           ...req.body,
           usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            medicoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error check logs"
        })
    }
}

const borrarMedico = async (req, res=response) => {

    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'medico not found'
            })
        }

        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Medico Deleted'
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error'
        })
    }
    
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}