const TaiKhoanThanhToan = require('../db/models/TaiKhoanThanhToan.Model');
const khachHangService = require('./khachang.service');
//#region BaseService
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
  if (typeof danhSachTaiKhoan !== undefined && danhSachTaiKhoan.length > 0) {
    console.log('tài khoản của số điện thoại');
    return danhSachTaiKhoan;
  }
  console.log('số điện thoại không tồn tài hoặc không hợp lệ');
  return {
    error: 'Số điện thoại không tồn tại ',
  };
};

module.exports.findAllByEmail = async (email) => {
  console.log('Tìm tài khoản thanh toán theo email');

  const khachhang = await khachHangService.findByEmail(email);
  console.log(`số điện thoại của khách hàng với email = ${email}`);
  console.log(!khachhang.error);
  if (!khachhang.error) {
    console.log(khachhang.sodienthoai);
    const { khachhangSodienthoai } = khachhang;
    let danhSachTaiKhoan = await TaiKhoanThanhToan.findAll({
      where: {
        khachhangSodienthoai: khachhang.sodienthoai,
      },
    });
    console.log('danh sách tài khoản ');
    // console.log(danhSachTaiKhoan);
    console.log(typeof danhSachTaiKhoan);
    console.log(danhSachTaiKhoan.length);
    if (typeof danhSachTaiKhoan !== undefined && danhSachTaiKhoan.length > 0) {
      return danhSachTaiKhoan;
    }
    console.log('email không tồn tại');
    return {
      error: 'Email không tồn tại ',
    };
  }

  // console.log(`danh sach tai khoan cua so dien thoai: ${khachhangSodienthoai}`);
  // console.log(danhSachTaiKhoan);
};

module.exports.findById = async (mataikhoan) => {
  let taiKhoan = await TaiKhoanThanhToan.findOne({
    where: {
      mataikhoan,
    },
  });
  console.log(`Tìm kiếm tài khoản thanh toán theo Id: ${mataikhoan}`);
  console.log(taiKhoan);
  if (!taiKhoan) {
    console.log('Không tìm thấy tài khoản');
    return {
      error: 'tai khoan khong ton tai',
    };
  }
  return taiKhoan;
};
//#endregion

//#region BusService
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
  const sodutruocgiaodich = taiKhoan.sodu;

  taiKhoan.sodu = +taiKhoan.sodu + +sotienchuyenkhoan;
  const result = await taiKhoan.save();
  const sodusaugiaodich = taiKhoan.sodu;
  return {
    sodutruocgiaodich,
    sodusaugiaodich,
  };
};
//#endregion
