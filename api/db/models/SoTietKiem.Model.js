const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const LaiSuat = require('./LaiSuat.Model');
const TaiKhoanThanhToan = require('./TaiKhoanThanhToan.Model');
const HinhThucTraLai = require('./HinhThucTraLai.Model');
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
    ngaymo: {
      // Ngày mở là ngày người gửi xác nhận và gửi tiền được nhân viên xử lý
      type: Sequelize.DATE,
      allowNull: false,
    },
    ngaydong: {
      // Dựa vào kỳ hạn và ngày mở sổ tiết kiệm => ngày đóng (ngày kết thúc kỳ hạn)
      type: Sequelize.DATE,
      allowNull: false,
    },
    ngayruttien: {
      // Ngày rút tiền là ngày khách hàng lấy tiền về,
      // nếu ngày rút tiền đúng hoặc sau kỳ hạn xác định thì lãi suất được tính bình thường,
      // nếu rút trước kỳ hạn thì lãi suất được tính bằng lãi suất không kỳ hạn (~0.5%/năm)
      type: Sequelize.DATE,
    },
    sotiengui: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    kyhan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tienlai: {
      // Tiền gốc * Lãi suất năm / 360 * Số tuần (Sổ tiết kiệm lãi suất theo tuần)
      // Tiền gốc * Lãi suất năm / 12 * Số tháng
      // Số tiền lãi khách hàng sẽ được nhận nếu mở sổ tiết kiệm
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    tinhtrang: {
      // Đang gửi
      // Đã tất toán (Toàn bộ tiền gốc và lãi được gửi về tài khoản thanh toán của khách)
      // Đã bị khóa
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'sotietkiem',
  }
);

SoTietKiem.belongsTo(HinhThucTraLai);
SoTietKiem.belongsTo(LaiSuat);
SoTietKiem.belongsTo(TaiKhoanThanhToan);
module.exports = SoTietKiem;
