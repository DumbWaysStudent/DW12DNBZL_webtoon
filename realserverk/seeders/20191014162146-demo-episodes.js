'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('episodes', [
      {
        title: "Eps . 1",
        image : "petruk.png",
        toons_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        title: "Eps.2",
        image : "petruk.png",
        toons_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        title: "Eps. 3",
        image : "petruk.png",
        toons_id: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        title: "Eps . 1",
        image : "petruk.png",
        toons_id: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        title: "Eps.2",
        image : "petruk.png",
        toons_id: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        title: "Eps. 3",
        image : "petruk.png",
        toons_id: 4,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episodes', null, {});
  }
};