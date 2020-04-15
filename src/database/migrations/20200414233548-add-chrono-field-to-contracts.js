module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contracts', 'chrono', {
      type: Sequelize.JSON,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('contracts', 'chrono');
  },
};
