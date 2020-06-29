const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const LaiSuat = require('./LaiSuat.Model');
const Model = Sequelize.Model;

class SoTietKiem extends Model {}
SoTietKiem.init(
  {
    id: {
      // Một sổ tiết kiệm có đinh danh được kết hợp bởi các thuộc tính
      // Mã tài khoản - Ngày mở - Ngày đóng
      type: Sequelize.STRING,
      primaryKey: true,
    },
    // attributes
    mataikhoan: {
      // Mã tài khoản thanh toán sẽ nhận tiền lãi
      type: Sequelize.STRING,
      allowNull: false,
    },
    ngaymo: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ngaydong: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    sotiengui: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    kyhan: {
      type: Sequelize.STRING,
    },
    tienlai: {
      // Tiền gốc * Lãi suất năm / 360 * Số tuần (Sổ tiết kiệm lãi suất theo tuần)
      // Tiền gốc * Lãi suất năm / 12 * Số tháng
      // Số tiền lãi khách hàng sẽ được nhận nếu mở sổ tiết kiệm
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    tingtrang: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'sotietkiem',
  }
);

SoTietKiem.belongsTo(LaiSuat);
module.exports = SoTietKiem;
