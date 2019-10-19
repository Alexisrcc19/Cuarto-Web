'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('paciente', {
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
        type: Sequelize.STRING(50)
      },
      nombres: {
        type: Sequelize.STRING(50)
      },
      fecha_nac: {
        type: Sequelize.DATEONLY
      },
      edad: {
        type: Sequelize.INTEGER
      },
      direccion: {
        type: Sequelize.STRING(50)
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
    return queryInterface.dropTable('paciente');
  }
};