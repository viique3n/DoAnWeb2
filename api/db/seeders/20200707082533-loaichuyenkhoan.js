'use strict';
const { loaiChuyenKhoan } = require('../dataset');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('loaichuyenkhoans', loaiChuyenKhoan);
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
