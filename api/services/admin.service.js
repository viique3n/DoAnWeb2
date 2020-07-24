const bcrypt = require('bcrypt');
const crypto = require('crypto');
const NhanVienQuanLy = require('../db/models/NhanVienQuanLy.Model');
const khachHangService = require('./khachang.service');
const taiKhoanThanhToanService = require('./taikhoan.service');
const giayToTuyThanService = require('./giaytotuythan.service');

//#region Admin Authentication

module.exports.findByPhone = async (sodienthoai) => {
  const nhanvien = await NhanVienQuanLy.findOne({
    where: {
      sodienthoai,
    },
  });

  if (!nhanvien) {
    return { error: 'Số điện thoại không tồn tại' };
  }

  return nhanvien;
};

module.exports.findByEmail = async (email) => {
  const nhanvien = await NhanVienQuanLy.findOne({
    where: {
      email,
    },
  });

  if (!nhanvien) {
    return { error: 'Email không tồn tại' };
  }

  return nhanvien;
};

const hashPassword = (module.exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
});

module.exports.verifyPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

//#endregion

//#region Quan lý thông tin khách hàng

module.exports.getThongTinKhachHang = async (filter) => {
  // console.log(filter);
  let dsKhachHang;
  dsKhachHang = await khachHangService.findAll(filter);
  // if (filter.email) {
  //   dsKhachHang = await khachHangService.findByEmail(filter.email);
  // } else if (filter.sodienthoai) {
  //   dsKhachHang = await khachHangService.findByPhone(filter.sodienthoai);
  // } else {
  //   dsKhachHang = await khachHangService.findAll(filter);
  // }
  if (dsKhachHang.error) {
    return {
      error: 'Không có khách hành theo yêu cầu',
    };
  }
  return dsKhachHang;
};

module.exports.capNhatTinhTrangKhachHang = async (filter) => {
  const capnhat = await khachHangService.capNhatTinhTrang(filter);
  if (capnhat.error) {
    const { error } = capnhat;
    console.log(error);
    return { error };
  }

  // console.log(capnhat);
  return capnhat;
};

module.exports.getThongTinKhachHangGiayToTuyThan = async (
  khachhangSodienthoai
) => {
  const giayto = giayToTuyThanService.findBySodienthoai(khachhangSodienthoai);
  return giayto;
};

module.exports.capNhatTinhTrangTaiKhoanThanhToan = async (thongtin) => {
  const { sodienthoai, tinhtrang } = thongtin;
  const taikhoan = await taiKhoanThanhToanService.findAllByPhone(sodienthoai);
  console.log(
    `Danh sách tài khoản thanh toán của số điện thoại: ${sodienthoai}`
  );
  console.log(taikhoan);
  if (taikhoan.length === 1) {
    console.log(`Mã tài khoản thanh toán: ${taikhoan[0].mataikhoan}`);
    const capnhattaikhoan = await taiKhoanThanhToanService.capNhatTinhTrang({
      tinhtrang,
      mataikhoan: taikhoan[0].mataikhoan,
    });
    if (capnhattaikhoan.error) {
      return {
        error: capnhattaikhoan.error,
      };
    }
    return capnhattaikhoan;
  }

  return;
};
//#endregion
