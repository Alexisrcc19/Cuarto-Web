var thinky = require('../config/thinky_init');
var type = thinky.type;
var r = thinky.r;
var Pasaje = thinky.createModel("pasaje", {
    id: type.string(),
    external_id: type.string().default(r.uuid()), 
    origen: type.string(),
    destino: type.string(),
    fecha: type.date(),
    duracion:type.string(),
    valor:type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date().default(r.now()),
    id_persona: type.string()
});

module.exports = Pasaje;
var Persona = require('./persona');
Pasaje.belongsTo(Persona, "persona", "id_persona", "id");



