'use strict';
module.exports = (sequelize, DataTypes) => {
  const pages = sequelize.define('pages', {
    image: DataTypes.STRING,
    episodes_id: DataTypes.INTEGER
  }, {});
  pages.associate = function(models) {
    // associations can be defined here
    pages.belongsTo(models.episodes, {
      as : 'episodesid',
      foreignKey: 'episodes_id',
    })
  };
  return pages;
};