const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const Model = Sequelize.Model;

class ChiTietLaiSuatTietKiem extends Model {}
ChiTietLaiSuatTietKiem.init(
  {
    // attributes
    mataikhoan: {
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
    kyhan: {
      type: Sequelize.INTEGER,
    },
    laisuat: {
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
    modelName: 'chitietlaisuattietkiem',
  }
);

module.exports = ChiTietLaiSuatTietKiem;
