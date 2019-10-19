'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consultaMedica', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diagnostico: {
        type: Sequelize.STRING
      },
      motivo: {
        type: Sequelize.STRING
      },
      receta: {
        type: Sequelize.STRING
      },
      fecha: {
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
    return queryInterface.dropTable('consultaMedica');
  }
};