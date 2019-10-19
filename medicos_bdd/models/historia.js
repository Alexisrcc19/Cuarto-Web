'use strict';
var models= require('../models');
module.exports = (sequelize, DataTypes) => {
  const historia = sequelize.define('historia', {
    nro_historia: DataTypes.STRING,
    contacto: DataTypes.STRING,
    enfermedades: DataTypes.STRING,
    enfer_here: DataTypes.STRING,
    habitos: DataTypes.STRING,
    external_id: DataTypes.UUID
  }, {freezeTableName: true});
  historia.associate = function(models) {
    // associations can be defined here
    historia.belongsTo(models.paciente,{foreignKey:'id_paciente'});
    historia.hasMany(models.consultaMedica,{foreignKey:'id_historia',as:'consultas'});
  };
  return historia;
};

