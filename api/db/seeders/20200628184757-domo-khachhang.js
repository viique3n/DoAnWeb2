'use strict';

function GenerateKhachHang() {
  let dsKhachHang = [];
  let i;
  for (i = 0; i < 100; i++) {
    const sdt = Math.floor(Math.random() * 100000000);
    const sodienthoai = '0' + sdt;
    const email = 'khachhang' + i + '@gmail.com';
    const tenhienthi = 'khach hang ' + i;
    const tinhtrang = 'Chưa xác thực';
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;
    const khachhang = {
      sodienthoai: sodienthoai,
      email: email,
      matkhau: '$2b$10$VEMs2WSLwk4KkRYyDk1ZmeSFWcwk6PVGSQXIHveICWtFkUVe3.nNG',
      tenhienthi: tenhienthi,
      tinhtrang: tinhtrang,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
    dsKhachHang.push(khachhang);
  }
  return dsKhachHang;
}

const dsKh = GenerateKhachHang();

//#region test du lieu
// const dsKh = [
//   {
//     sodienthoai: '01564654645',
//     email: 'test@gmail.com',
//     matkhau: '$2b$10$VEMs2WSLwk4KkRYyDk1ZmeSFWcwk6PVGSQXIHveICWtFkUVe3.nNG',
//     tenhienthi: 'test',
//     tinhtrang: 'test',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
//#endregion

const listKhachHang = [
  {
    sodienthoai: '0346464555',
    email: 'khachhang1@gmail.com',
    matkhau: '$2b$10$cqDKADESd.vW3pu9VAC4nOJ/DZs8dgzmvzuj1eL0Uk0kN5grKDEd2',
    tenhienthi: 'khachhang1',
    tinhtrang: 'chua xac thuc',
    createdAt: '2020-06-28 23:50:25.342+07',
    updatedAt: '2020-06-28 23:50:25.342+07',
  },
  {
    sodienthoai: '0',
    email: 'khachhang1@gmail.com',
    matkhau: '$2b$10$cqDKADESd.vW3pu9VAC4nOJ/DZs8dgzmvzuj1eL0Uk0kN5grKDEd2',
    tenhienthi: 'khachhang1',
    tinhtrang: 'chua xac thuc',
    createdAt: '2020-06-28 23:50:25.342+07',
    updatedAt: '2020-06-28 23:50:25.342+07',
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('khachhangs', dsKh);
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
