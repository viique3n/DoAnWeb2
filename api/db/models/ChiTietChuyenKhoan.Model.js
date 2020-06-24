const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class ChiTietChuyenKhoan extends Model {}
ChiTietChuyenKhoan.init(
  {
    // attributes
    mataikhoanchuyenkhoan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mataikhoanthuhuong: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sotienchuyenkhoan: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    noidung: {
      type: Sequelize.TEXT,
    },
    thoigian: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize: db,
    modelName: 'chitietchuyenkhoan',
  }
);

module.exports = ChiTietChuyenKhoan;
