const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class LoaiTaiKhoan extends Model {}
LoaiTaiKhoan.init(
  {
    // attributes
    donvitiente: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tenloaitaikhoan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'loaitaikhoan',
  }
);

module.exports = LoaiTaiKhoan;
