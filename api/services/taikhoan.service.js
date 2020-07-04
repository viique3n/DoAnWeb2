const TaiKhoanThanhToan = require('../db/models/TaiKhoanThanhToan.Model');

module.exports.TaoTaiKhoan = async (taikhoan) => {
  const taikhoan ={
    mataikhoan,
    donvitiente,
    sodu,
    tinhtrang,
    token,
    createdAt,
    updatedAt,
    khachhangSodienthoai,
  } ;
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
      error: 'Bảng tài khoản thanh toán rỗng',
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
          error: 'Số điện thoại không tồn tại ',
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
