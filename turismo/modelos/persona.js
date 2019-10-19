var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Persona = thinky.createModel("persona", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    //cedula: type.string(),
    apellidos: type.string(), 
    nombres: type.string(), 
    fecha_nac: type.date(),
    edad: type.number(),
    createdAt: type.date().default(r.now())
});
module.exports = Persona;
var Cuenta = require("./cuenta");
Persona.hasOne(Cuenta, "cuenta", "id", "id_persona");
var Rol= require("./rol");
Persona.belongsTo(Rol, "rol", "id_rol", "id");
