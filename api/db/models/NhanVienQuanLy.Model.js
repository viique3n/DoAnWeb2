const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class NhanVienQuanLy extends Model {}
NhanVienQuanLy.init(
  {
    // attributes
    sodienthoai: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    tenhienthi: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    matkhau: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'nhanvienquanly',
  }
);
module.exports = NhanVienQuanLy;
