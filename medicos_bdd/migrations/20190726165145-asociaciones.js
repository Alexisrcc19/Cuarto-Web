'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
                'cuenta',
                'id_persona',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'persona',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                })
                .then(() => {
                    return queryInterface.addColumn(
                            'historia',
                            'id_paciente',
                            {
                                type: Sequelize.INTEGER,
                                references: {
                                    model: 'paciente',
                                    key: 'id'
                                },
                                onUpdate: 'CASCADE',
                                onDelete: 'SET NULL'
                            }
                    );
                }).then(() => {
            return queryInterface.addColumn(
                    'consultaMedica',
                    'id_historia',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'historia',
                            key: 'id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'SET NULL'
                    }
            );
        }).then(() => {
            return queryInterface.addColumn(
                    'consultaMedica',
                    'id_medico',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'persona',
                            key: 'id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'SET NULL'
                    }
            );
        })
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.
         
         Example:
         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    down: (queryInterface, Sequelize) => {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.
         
         Example:
         return queryInterface.dropTable('users');
         */

        return queryInterface.removeColumn(
                'cuenta',
                'id_persona'
                ).then(() => {
            return queryInterface.removeColumn(
                    'historia',
                    'id_paciente'
                    );
        }).then(() => {
            return queryInterface.removeColumn(
                    'consultaMedica',
                    'id_historia'
                    );
        }).then(() => {
            return queryInterface.removeColumn(
                    'consultaMedica',
                    'id_medico'
                    );
        });
    }
};
