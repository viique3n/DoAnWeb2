'use strict';

// const taikhoan = require('0200704032226Taikhoan');
// const laisuat = require('0200629030429Laisuat');

// function GeneraterSoTietKiem() {
//   let danhSachSoTietKiem = [];
//   let i;
//   for (i; i < 100; i++) {
//     const sdt = Math.floor(Math.random() * 100000000);
//     const khachhangSodienthoai = '0' + sdt;
//     const id =
//       taikhoan.mataikhoan +
//       ngaymo.getUTCDay +
//       ngaymo.getUTCMonth +
//       ngaymo.getFullYear +
//       ngaydong.getDay +
//       ngaydong.getMonth +
//       ngaydong.getFullYear;
//     const mataikhoan = taikhoan.mataikhoan;
//     const now = new Date();
//     const ngaymo = now;
//     const ngaydong = now;
//     const sotiengui = Math.floor(Math.random() * 1000000000000);
//     const kyhan = laisuat.kyhan;
//     // const tienlai = {
//     //   if(kyhan = '10 tháng' && )
//     // };
//     const tinhtrang = 'Chưa hoàn tất ';
//     const createdAt = now;
//     const updatedAt = now;
//     const laisuatId = laisuat.id;
//   }
// }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
