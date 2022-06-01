const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, //indica la relacion con el modelo usuario, un hospital puede tener un usuario solamente que lo creo
        ref: 'Usuario'
    }
});


HospitalSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model( 'Hospital', HospitalSchema);