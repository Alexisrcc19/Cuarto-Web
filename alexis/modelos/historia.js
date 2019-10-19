var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Historia = thinky.createModel("Historia", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    nro_historia: type.string(),
    contacto: type.string(),
    enfermedades: type.string(),
    enfer_hede: type.string(),
    habitos: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_paciente: type.string()
});

module.exports = Historia;
var Paciente = require('./paciente');
Historia.belongsTo(Paciente, "paciente", "id_paciente", "id");
var consultaMedica= require("./consultaMedica");
Historia.hasMany(consultaMedica, "consultaMedica", "id", "id_historial");