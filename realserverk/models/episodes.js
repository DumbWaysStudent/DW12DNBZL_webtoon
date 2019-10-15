'use strict';
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define('episodes', {
    title: DataTypes.STRING,
    toons_id: DataTypes.INTEGER,
    image: {
      type: DataTypes.STRING,
      //Set custom getter for book image using URL
      get(){
          const image = this.getDataValue('image');
          return "/img/"+image;
      }
    },
  }, {});
  episodes.associate = function(models) {
    // associations can be defined here
    episodes.belongsTo(models.toons, {
      as : 'toonsid',
      foreignKey: 'toons_id',
    })
  };
  return episodes;
};