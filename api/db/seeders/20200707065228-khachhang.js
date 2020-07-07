'use strict';
const { danhSachKhachHang } = require('../dataset');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('khachhangs', danhSachKhachHang);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
