const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const LoaiGiayTo = require('./LoaiGiayTo.Model');
const KhachHang = require('./khachhang.model');
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
  },
  {
    sequelize: db,
    modelName: 'giaytotuythan',
  }
);
GiayToTuyThan.belongsTo(KhachHang);
KhachHang.hasOne(GiayToTuyThan);

module.exports = GiayToTuyThan;
