'use strict';
module.exports = (sequelize, DataTypes) => {
  const toons = sequelize.define('toons', {
    tittle: DataTypes.STRING,
    genre: DataTypes.STRING,
    isFavorite: DataTypes.BOOLEAN,
    image: {
      type: DataTypes.STRING,
      
    },
    created_By: DataTypes.INTEGER
  }, {});
  toons.associate = function(models) {
    // associations can be defined here
    toons.belongsTo(models.user, {
      as : 'createdBy',
      foreignKey: 'created_By',
    })
  };
  return toons;
};