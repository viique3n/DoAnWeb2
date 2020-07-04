'use strict';

function GenerateTaiKhoan(){
  let dsTaiKhoan=[];
  let i;
  for( i = 0 ; i<100; i ++){
    const sdt = Math.floor(Math.random() * 100000000);
    const khachhangSodienthoai = '0' + sdt;
    const mataikhoan = sdt + createdAt.getDay + createdAt.getMonth + createdAt.getFullYear + createdAt.getHours + createdAt.getMinutes + createdAt.getSeconds;
    const donvitiente = 'VND';
    const sodu = 0;
    const tinhtrang = 'Chưa kích hoạt';
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;
    const taikhoanthanhtoan = {
      mataikhoan,
      donvitiente,
      sodu,
      tinhtrang, 
      createdAt,
      updatedAt,
      khachhangSodienthoai,
    };
    dsTaiKhoan.push(taikhoanthanhtoan);
  }
  return dsTaiKhoan;
}

const dsTK = GenerateTaiKhoan();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taikhoanthanhtoan', dsTK);
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
  }
};
