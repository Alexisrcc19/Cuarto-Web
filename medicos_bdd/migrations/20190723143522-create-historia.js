'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('historia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro_historia: {
        type: Sequelize.STRING(10)
      },
      contacto: {
        type: Sequelize.STRING
      },
      enfermedades: {
        type: Sequelize.STRING
      },
      enfer_here: {
        type: Sequelize.STRING
      },
      habitos: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('historia');
  }
};