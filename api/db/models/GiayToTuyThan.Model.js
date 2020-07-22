const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const LoaiGiayTo = require('./LoaiGiayTo.Model');
const KhachHang = require('./KhachHang.Model');
const Model = Sequelize.Model;

class GiayToTuyThan extends Model {}
GiayToTuyThan.init(
  {
    magiayto: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    // attributes
    ngaycap: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    hinhanhurl: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'giaytotuythan',
  }
);
GiayToTuyThan.belongsTo(LoaiGiayTo);
module.exports = GiayToTuyThan;
