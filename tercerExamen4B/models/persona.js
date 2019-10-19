'use strict';
module.exports = (sequelize, DataTypes) => {
  const persona = sequelize.define('persona', {
    cedula: DataTypes.STRING(10),
    apellidos: DataTypes.STRING(50),
    nombres: DataTypes.STRING(50),
    edad: DataTypes.INTEGER,
    fecha_nac: DataTypes.DATEONLY,
    external_id: DataTypes.UUID,
    pasaporte: DataTypes.STRING,
    nacionalidad:DataTypes.STRING
  }, {freezeTableName: true});
  persona.associate = function(models) {
    // associations can be defined here
    persona.hasOne(models.pasaje,{foreignKey: 'id_persona', as: 'pasaje'});
  };
  return persona;
};

