const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class ChiTietChuyenKhoan extends Model {}
ChiTietChuyenKhoan.init(
  {
    id: {
      // Một chi tiết chuyển khoản có định danh là kết hợp của 3 thuộc tính
      // Tài khoản chuyển khoản, tài khoản thụ hưởng và thời gian diễn ra giao dịch
      type: Sequelize.STRING,
      primaryKey: true,
    },
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
