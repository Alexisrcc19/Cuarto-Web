'use strict';
module.exports = (sequelize, DataTypes) => {
  const cuenta = sequelize.define('cuenta', {
    correo: DataTypes.STRING,
    clave: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {freezeTableName: true});
  cuenta.associate = function(models) {
    // associations can be defined here
    cuenta.belongsTo(models.persona,{foreignKey:'id_persona'});
  };
  return cuenta;
};