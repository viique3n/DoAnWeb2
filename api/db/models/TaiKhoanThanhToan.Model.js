const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class TaiKhoanThanhToan extends Model {
  static async findById(id) {
    return TaiKhoan.findByPk(id);
  }
}
TaiKhoanThanhToan.init(
  {
    // attributes
    mataikhoan: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    donvitiente: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sodu: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    tinhtrang: {
      // Chưa xác thực - Hoạt động bình thường - Bị khóa - Đã hủy
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'taikhoanthanhtoan',
  }
);

module.exports = TaiKhoanThanhToan;
