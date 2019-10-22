'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image : 
    {
      type: DataTypes.STRING,
      //Set custom getter for book image using URL
      get(){
          const image = this.getDataValue('image');
          return image;
      }
  }
  }, {});
  user.associate = function(models) {
    user.belongsToMany(models.toons,{
      through: 'userfav',
      as : 'toons',
      foreignKey : 'user_id',
      otherKey : 'toon_id'
    })
  };
  return user;
};