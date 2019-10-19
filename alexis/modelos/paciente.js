var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Paciente = thinky.createModel("Paciente", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    cedula: type.string(),
    apellidos: type.string(), 
    nombres: type.string(), 
    fecha_nac: type.date(),
    edad: type.number(),
    direccion: type.string(), 
    updatedAt: type.date().default(r.now()),
    createdAt: type.date().default(r.now())
});
module.exports = Paciente;
var Historia = require("./historia");
Paciente.hasOne(Historia, "historia", "id", "id_paciente");