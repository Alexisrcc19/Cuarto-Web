var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Rol = thinky.createModel("rol", {
    id: type.string(),
    nombre: type.string()
});

module.exports = Rol;
var Persona = require('./persona');
Rol.hasMany(Persona, "personas", "id", "id_rol");

