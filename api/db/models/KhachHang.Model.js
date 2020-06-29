const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const TaiKhoanThanhToan = require('./TaiKhoanThanhToan.Model');
const SoTietKiem = require('./SoTietKiem.Model');
const Model = Sequelize.Model;

class KhachHang extends Model {
  static async findById(id) {
    return KhachHang.findByPk(id);
  }
  static async findByEmail(email) {
    return KhachHang.findOne({
      where: {
        email,
      },
    });
  }
  static async findByPhone(phoneNumber) {
    return KhachHang.findOne({
      where: {
        sodienthoai: phoneNumber,
      },
    });
  }
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static verifyPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  }
  static async add(sodienthoai, email, tenhienthi, matkhau, token) {
    return KhachHang.create({
      sodienthoai,
      email,
      tenhienthi,
      matkhau,
      token,
    });
  }
}
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

KhachHang.hasMany(SoTietKiem);
SoTietKiem.belongsTo(KhachHang);
KhachHang.hasMany(TaiKhoanThanhToan);
TaiKhoanThanhToan.belongsTo(KhachHang);
module.exports = KhachHang;
