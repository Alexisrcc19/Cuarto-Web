'use strict';
var models= require('../models');
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('persona', {
    cedula: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    nombres: DataTypes.STRING,
    nro_registro: DataTypes.STRING,
    especialdidad: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    fecha_nac: DataTypes.DATEONLY,
    external_id: DataTypes.UUID,
    foto: DataTypes.STRING
    
  }, {freezeTableName: true});//este codigo va para todos los modelos. Es una propiedad para decirle a sequelize q use el mismo nombre de la tabla q esta en el modelo.
  Persona.associate = function(models) {
    // associations can be defined here
    Persona.hasOne(models.cuenta,{foreignKey:'id_persona',as:'cuenta'});
   Persona.hasMany(models.consultaMedica,{foreignKey:'id_medico',as:'consultas'});
    //{foreingKey:'id_persona',as:'cuenta'} // Codigo q permite hacer el codigo del controlador mas optimo
  };
  return Persona;
};