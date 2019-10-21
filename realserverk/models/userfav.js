'use strict';
module.exports = (sequelize, DataTypes) => {
  const userfav = sequelize.define('userfav', {
    user_id: DataTypes.INTEGER,
    toon_id: DataTypes.INTEGER
  }, {});
  userfav.associate = function(models) {
    // associations can be defined here
    userfav.belongsTo(models.user, {
      as : 'userid',
      foreignKey: 'user_id',
    }),
    userfav.belongsTo(models.toons, {
      as : 'toonid',
      foreignKey: 'toon_id',
    })
  };
  return userfav;
};