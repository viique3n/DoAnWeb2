const TaiKhoanThanhToan = require('../db/models/TaiKhoanThanhToan.Model');

module.exports.TaoTaiKhoan = async (taikhoan) => {
  const {
    mataikhoan,
    donvitiente,
    sodu,
    tinhtrang,
    token,
    createdAt,
    updatedAt,
    khachhangSodienthoai,
  } = taikhoan;
  const newTaiKhoan = await TaiKhoanThanhToan.create({
    mataikhoan,
    donvitiente,
    sodu,
    tinhtrang,
    token,
    createdAt,
    updatedAt,
    khachhangSodienthoai,
  });
  return newTaiKhoan;
};

module.exports.findAll = async () => {
  let danhSachTaiKhoan = await TaiKhoanThanhToan.findAll();
  if (!danhSachTaiKhoan) {
    return {
      error: 'bang tai khoan thanh toan rong',
    };
  }
  return danhSachTaiKhoan;
};

module.exports.findAllByPhone = async (khachhangSodienthoai) => {
  let danhSachTaiKhoan = await TaiKhoanThanhToan.findAll({
    where: {
      khachhangSodienthoai,
    },
  });
  if (!danhSachTaiKhoan) {
    return {
      error: 'So dien thoai khong ton tai',
    };
  }
  return danhSachTaiKhoan;
};
module.exports.findById = async (mataikhoan) => {
  let taiKhoan = await TaiKhoanThanhToan.findOne({
    where: {
      mataikhoan,
    },
  });
  if (!taiKhoan) {
    return {
      error: 'tai khoan khong ton tai',
    };
  }
  return taiKhoan;
};
