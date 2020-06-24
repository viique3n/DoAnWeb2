const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class LoaiGiayTo extends Model {}
LoaiGiayTo.init(
  {
    // attributes
    tenloaigiayto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'loaigiayto',
  }
);

module.exports = LoaiGiayTo;
