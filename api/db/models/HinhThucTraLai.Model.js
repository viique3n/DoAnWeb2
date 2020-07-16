const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class HinhThucTraLai extends Model {}
HinhThucTraLai.init(
  {
    id: {
      // Dựa vào kỳ hạn, mức tiền gửi -> id
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tenhinhthuc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'hinhthuctralai',
  }
);

module.exports = HinhThucTraLai;
