var thinky = require('../config/thinky_init');
var type = thinky.type;
var r= thinky.r;
var consultaMedica= thinky.createModel("consultaMedica",{
	id: type.string(),
        diagnostico: type.string(),
        motivo: type.string(),
        receta: type.string(),
        fecha: type.date(),
        createdAt: type.date().default(r.now()),
        updatedAt: type.date().default(r.now()),
        id_medico: type.string(),
        id_historial: type.string()
});
module.exports = consultaMedica;
var Medico = require("./medico");
var Historia = require("./historia");
consultaMedica.belongsTo(Medico,"medico","id_medico","id");
consultaMedica.belongsTo(Historia,"historia","id_historial","id");