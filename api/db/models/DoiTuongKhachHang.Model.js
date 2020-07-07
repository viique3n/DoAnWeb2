const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class DoiTuongKhachHang extends Model {}
DoiTuongKhachHang.init(
  {
    // Khách hàng thông thường
    // Khách hàng ưu tiên
    // ...
    tendoituong: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'doituongkhachhang',
  }
);

module.exports = DoiTuongKhachHang;
