'use strict';
const { hanMucGiaoDich } = require('../dataset');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hanmucgiaodiches', hanMucGiaoDich);
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
