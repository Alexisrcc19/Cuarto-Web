var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Persona = thinky.createModel("persona", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    cedula: type.string(),
    pasaporte: type.string(),
    apellidos: type.string(), 
    nombres: type.string(), 
    fecha_nac: type.date(),
    edad: type.number(),
    nacionalidad:type.string(),
    createdAt: type.date().default(r.now())
});
module.exports = Persona;
var Pasaje = require("./pasaje");
Persona.hasMany(Pasaje, "pasaje", "id", "id_persona");
