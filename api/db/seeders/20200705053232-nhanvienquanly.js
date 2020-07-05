'use strict';
const now = new Date();
const admin = {
  sodienthoai: '0123456789',
  email: 'admin@admin.com',
  matkhau: '$2b$10$VEMs2WSLwk4KkRYyDk1ZmeSFWcwk6PVGSQXIHveICWtFkUVe3.nNG',
  tenhienthi: 'Admin',
  createdAt: now,
  updatedAt: now,
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(admin);
    return queryInterface.bulkInsert('nhanvienquanlies', admin);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
