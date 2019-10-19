var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Medico = thinky.createModel("Medico", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    cedula: type.string(),
    apellidos: type.string(), 
    nombres: type.string(), 
    fecha_nac: type.date(),
    edad: type.number(),
    nro_registro: type.string(), 
    especialdidad: type.string(),
    createdAt: type.date().default(r.now())
});
module.exports = Medico;
var Cuenta = require("./cuenta");
Medico.hasOne(Cuenta, "cuenta", "id", "id_medico");
var consultaMedica= require("./consultaMedica");
Medico.hasMany(consultaMedica, "consultaMedica", "id", "id_medico");


