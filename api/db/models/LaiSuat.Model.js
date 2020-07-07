const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class LaiSuat extends Model {}
LaiSuat.init(
  {
    id: {
      // Dựa vào kỳ hạn, mức tiền gửi -> id
      type: Sequelize.STRING,
      primaryKey: true,
    },
    donvitiente: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    kyhan: {
      // Sổ tiết kiệm có thể thuộc dạng không kỳ hạn -> Lãi suất thấp
      // Kỳ hạn theo tuần (Tối thiểu 1 tuần) - Lãi suất theo năm ~ 0.8%
      // Kỳ hạng theo tháng (1-12, 18, 24, 36 tháng)
      // Lãi suất được nhận không vượt quá 5.5%/ năm đối với kỳ hạn dưới 6 tháng
      type: Sequelize.STRING,
    },
    muctientoithieu: {
      // Mức tiền
      // Dưới 300 triệu
      // 300 triệu - 1 tỷ
      // 1 tỷ - 5 tỷ
      // 5 tỷ - 10 tỷ
      // Trên 10 tỷ
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    muctientoida: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    laisuat: {
      // Lãi suất không kỳ hạn ~ 0.5%
      // Tiền gốc * Lãi suất năm / 360 * Số tuần (Sổ tiết kiệm lãi suất theo tuần)
      // Tiền gốc * Lãi suất năm / 12 * Số tháng
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'laisuat',
  }
);

module.exports = LaiSuat;
