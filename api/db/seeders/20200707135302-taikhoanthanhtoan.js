'use strict';
const { taiKhoanThanhToan } = require('../dataset');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taikhoanthanhtoans', taiKhoanThanhToan);
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
