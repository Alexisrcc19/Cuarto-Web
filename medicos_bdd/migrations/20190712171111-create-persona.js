
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('persona', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cedula: {
                type: Sequelize.STRING(10)
            },
            apellidos: {
                type: Sequelize.STRING(40)
            },
            nombres: {
                type: Sequelize.STRING(40)
            },
            nro_registro: {
                type: Sequelize.STRING(15)
            },
            especialdidad: {
                type: Sequelize.STRING(40)
            },
            edad: {
                type: Sequelize.INTEGER
            },
            fecha_nac: {
                type: Sequelize.DATEONLY
            },
            external_id: {
                type: Sequelize.UUID
                
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('persona');
    }
};