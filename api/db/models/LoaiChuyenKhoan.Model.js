const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class LoaiChuyenKhoan extends Model {}
LoaiChuyenKhoan.init(
  {
    loaichuyenkhoan: {
      // Chuyển khoản cho tài khoản thuộc về cùng một khách hàng
      // Chuyển khoản cho tài khoản thuộc về một khách hàng khác trong cùng một ngân hàng
      // Chuyển khoản cho tài khoản khác thuộc một ngân hàng khác
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'loaichuyenkhoan',
  }
);

module.exports = LoaiChuyenKhoan;
