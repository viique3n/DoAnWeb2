const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class RefreshToken extends Model {}
RefreshToken.init(
  {
    // attributes
    token: {
      type: Sequelize.TEXT,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: 'refreshtoken',
  }
);
module.exports = RefreshToken;
