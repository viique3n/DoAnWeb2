const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const DoiTuongKhachHang = require('./DoiTuongKhachHang.Model');
const LoaiChuyenKhoan = require('./LoaiChuyenKhoan.Model');
const Model = Sequelize.Model;

class HanMucGiaoDich extends Model {}
HanMucGiaoDich.init(
  {
    // Được xác định bởi đối tượng khách hàng và loại chuyển khoản
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    hanmuctoithieutrengiaodich: {
      type: Sequelize.DECIMAL,
      defaultValue: '-1',
      // Không quy định
    },
    hanmuctoidatrengiaodich: {
      type: Sequelize.DECIMAL,
    },
    hanmuctoidatrenngay: {
      type: Sequelize.DECIMAL,
    },
  },
  {
    sequelize: db,
    modelName: 'hanmucgiaodich',
  }
);

HanMucGiaoDich.belongsTo(DoiTuongKhachHang);
HanMucGiaoDich.belongsTo(LoaiChuyenKhoan);
module.exports = HanMucGiaoDich;
