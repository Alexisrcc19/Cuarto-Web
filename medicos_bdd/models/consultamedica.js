'use strict';
var models= require('../models');
module.exports = (sequelize, DataTypes) => {
  const consultaMedica = sequelize.define('consultaMedica', {
    diagnostico: DataTypes.STRING,
    motivo: DataTypes.STRING,
    receta: DataTypes.STRING,
    fecha: DataTypes.DATEONLY,
    external_id: DataTypes.UUID
  }, {freezeTableName: true});
  consultaMedica.associate = function(models) {
    // associations can be defined here
    consultaMedica.belongsTo(models.persona,{foreignKey:'id_medico'});
    consultaMedica.belongsTo(models.historia,{foreignKey:'id_historia'});
  };
  return consultaMedica;
};