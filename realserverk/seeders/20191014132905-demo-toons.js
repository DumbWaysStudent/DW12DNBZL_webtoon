'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('toons', [
      {
        tittle: "Godain Kita Dong",
        genre: "Thriller",
        isFavorite : true,
        image : "petruk.png",
        created_By: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        tittle: "Setan Mudik",
        genre: "Thriller",
        isFavorite : true,
        image : "petruk.png",
        created_By: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        tittle: "Genderuwo Lucinta",
        genre: "Thriller",
        isFavorite : false,
        image : "petruk.png",
        created_By: 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('toons', null, {});
  }
};