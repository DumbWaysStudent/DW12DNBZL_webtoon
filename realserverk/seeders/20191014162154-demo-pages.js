'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pages', [
      {
        image : "petruk.png",
        episodes_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        image : "petruk.png",
        episodes_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        image : "petruk.png",
        episodes_id: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pages', null, {});
  }
};