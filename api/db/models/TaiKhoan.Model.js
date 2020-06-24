const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const LoaiTaiKhoan = require('./LoaiTaiKhoan.Model');
const Model = Sequelize.Model;

class TaiKhoan extends Model {}
TaiKhoan.init(
  {
    // attributes
    mataikhoan: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    donvitiente: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sodu: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'taikhoan',
  }
);

TaiKhoan.belongsTo(LoaiTaiKhoan);

module.exports = TaiKhoan;
