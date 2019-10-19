'use strict';
var models= require('../models');
module.exports = (sequelize, DataTypes) => {
  const paciente = sequelize.define('paciente', {
    cedula: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    nombres: DataTypes.STRING,
    fecha_nac: DataTypes.DATEONLY,
    edad: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    external_id: DataTypes.UUID,
    foto: DataTypes.STRING
  }, {freezeTableName: true});
  paciente.associate = function(models) {
    // associations can be defined here
    paciente.hasOne(models.historia,{foreignKey:'id_paciente',as: 'historia'});
  };
  return paciente;
};