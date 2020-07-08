const TaiKhoanThanhToan = require('../db/models/TaiKhoanThanhToan.Model');

module.exports.generateMaTaiKhoan = (sodienthoai) => {
  const now = new Date();
  const d = ('0' + now.getDate()).slice(-2);
  const m = ('0' + now.getMonth()).slice(-2);
  const y = now.getFullYear().toString().substr(-2);
  const hs = ('0' + now.getHours()).slice(-2);
  const mn = ('0' + now.getMinutes()).slice(-2);

  return '' + sodienthoai + d + m + y + hs + mn;
};

module.exports.taoTaiKhoan = async (taikhoan) => {
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
  if (!newTaiKhoan) {
    return {
      error: 'tạo tài khoản thất bại',
    };
  }
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
  console.log(`danh sach tai khoan cua so dien thoai: ${khachhangSodienthoai}`);
  console.log(danhSachTaiKhoan);
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

module.exports.capNhatSoDu = async (thongtin) => {
  console.log('Cập nhật số dư');
  const { mataikhoan, sotienchuyenkhoan } = thongtin;
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
  console.log(taiKhoan.dataValues);

  console.log(`typeof sotienchuyenkhoan: ${typeof sotienchuyenkhoan}`);
  console.log(`typeof sodu: ${typeof taiKhoan.sodu}`);
  taiKhoan.sodu = Number(taiKhoan.sodu) + Number(sotienchuyenkhoan);
  const result = await taiKhoan.save();
  return result;
};
