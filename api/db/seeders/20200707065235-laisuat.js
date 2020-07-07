'use strict';
const { bangLaiSuat } = require('../dataset');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('laisuats', bangLaiSuat);
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
