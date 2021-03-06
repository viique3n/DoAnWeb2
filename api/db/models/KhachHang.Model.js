const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const TaiKhoanThanhToan = require('./TaiKhoanThanhToan.Model');
const SoTietKiem = require('./SoTietKiem.Model');
const DoiTuongKhachHang = require('./DoiTuongKhachHang.Model');
const GiayToTuyThan = require('./GiayToTuyThan.Model');
const Model = Sequelize.Model;

class KhachHang extends Model {}
KhachHang.init(
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
    tinhtrang: {
      // Chưa xác thực - Đã xác thực - Đã xóa
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Chưa xác thực',
    },
    token: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'khachhang',
  }
);

KhachHang.belongsTo(DoiTuongKhachHang);
GiayToTuyThan.belongsTo(KhachHang);
KhachHang.hasMany(SoTietKiem);
SoTietKiem.belongsTo(KhachHang);
KhachHang.hasMany(TaiKhoanThanhToan);
TaiKhoanThanhToan.belongsTo(KhachHang);
module.exports = KhachHang;
