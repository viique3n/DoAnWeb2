const bcrypt = require('bcrypt');
const crypto = require('crypto');
const NhanVienQuanLy = require('../db/models/NhanVienQuanLy.Model');
const khachHangService = require('./khachang.service');

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
module.exports.getThongTinKhachHang = async (conditions) => {
  console.log(conditions);
  let dsKhachHang;
  if (conditions.email) {
    dsKhachHang = await khachHangService.findByEmail(conditions.email);
  } else if (conditions.sodienthoai) {
    dsKhachHang = await khachHangService.findByPhone(conditions.sodienthoai);
  } else {
    dsKhachHang = await khachHangService.findAll(conditions);
  }
  if (dsKhachHang.error) {
    return {
      error: 'Không có khách hành theo yêu cầu',
    };
  }
  return dsKhachHang;
};

module.exports.CapNhatTinhTrangKhachHang = async (conditions) => {
  const capnhat = khachHangService.CapNhatTinhTrang(conditions);
  if (capnhat.error) {
    const { error } = capnhat;
    console.log(error);
    return { error };
  }

  console.log(capnhat);
  return capnhat;
};
//#region
