'use strict';
//var uuid=require('uuid');
module.exports = (sequelize, DataTypes) => {
    const pasaje = sequelize.define('pasaje', {
        salida: DataTypes.STRING(30),
        destino: DataTypes.STRING(50),
        nro_asiento: DataTypes.STRING(50),
        costo: DataTypes.STRING(50),
        fecha: DataTypes.DATEONLY,
        tipo: DataTypes.STRING(50),
        external_id: DataTypes.UUID
    }, {freezeTableName: true});
    pasaje.associate = function (models) {
        // associations can be defined here
        pasaje.belongsTo(models.persona, {foreignKey: 'id_persona'});
    };
    return pasaje;
};

