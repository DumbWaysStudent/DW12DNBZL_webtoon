'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'budi@gmail.com',
        password: '12345',
        name: 'Budi Santoso'
      },
      {
        email: 'samsudi@gmail.com',
        password: '12345',
        name: 'Samsudi hadi'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};