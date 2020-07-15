const SoTietKiem = require('../db/models/SoTietKiem.Model');
const chuyenKhoanService = require('./chuyenkhoan.service');
const taiKhoanThanhToanService = require('./taikhoan.service');

//#region BaseService
function generateMaSoTietKiem(sodienthoai, laisuat) {
  const now = new Date();
  const d = ('0' + now.getDate()).slice(-2);
  const m = ('0' + now.getMonth()).slice(-2);
  const y = now.getFullYear().toString().substr(-2);
  const hs = ('0' + now.getHours()).slice(-2);
  const mn = ('0' + now.getMinutes()).slice(-2);

  return '' + sodienthoai + laisuat + d + m + y + hs + mn;
}
function generateMaChuyenKhoan(mataikhoanchuyenkhoan, mataikhoanthuhuong) {
  const now = new Date();
  const d = ('0' + now.getDate()).slice(-2);
  const m = ('0' + now.getMonth()).slice(-2);
  const y = now.getFullYear().toString().substr(-2);
  const hs = ('0' + now.getHours()).slice(-2);
  const mn = ('0' + now.getMinutes()).slice(-2);
  const sc = ('0' + now.getSeconds()).slice(-2);
  return (
    '' + mataikhoanchuyenkhoan + mataikhoanthuhuong + d + m + y + hs + mn + sc
  );
}
module.exports.taoSoTietKiem = async (sotietkiem) => {
  const {
    ngaymo,
    ngaydong,
    sotiengui,
    laisuatId,
    laisuat,
    kyhan,
    tienlai,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
  } = sotietkiem;
  console.log(sotietkiem);

  const maSoTietKiem = generateMaSoTietKiem(khachhangSodienthoai, laisuat);

  //Tạo sổ tiết kiệm
  const newSotietkiem = await SoTietKiem.create({
    id: maSoTietKiem,
    ngaymo,
    ngaydong,
    sotiengui,
    kyhan,
    tienlai,
    tinhtrang: 'Đang trong thời gian gửi tiết kiệm',
    createdAt: new Date(),
    updatedAt: new Date(),
    laisuatId,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
  });

  if (!newSotietkiem) {
    return {
      error: 'Không thể tạo sổ tiết kiệm',
    };
  }

  // Nếu tạo sổ tiết kiệm không bị lỗi thì chuyển qua cập nhật lại số dư cho tài khoản thanh toán
  const capNhatTaiKhoanThanhToan = await taiKhoanThanhToanService.capNhatSoDu({
    mataikhoan: taikhoanthanhtoanMataikhoan,
    sotienchuyenkhoan: -sotiengui,
  });

  if (!capNhatTaiKhoanThanhToan) {
    return {
      error: 'Cập nhật tài khoản thanh toán thất bại',
    };
  }

  const maChuyenKhoan = generateMaChuyenKhoan(
    taikhoanthanhtoanMataikhoan,
    maSoTietKiem
  );
  const now = new Date();
  const dmy =
    now.getDate() + '-' + (+now.getMonth() + +1) + '-' + now.getFullYear();
  const taoChuyenKhoan = await chuyenKhoanService.taoChuyenKhoan({
    maChuyenKhoan,
    mataikhoanchuyenkhoan: taikhoanthanhtoanMataikhoan,
    mataikhoanthuhuong: maSoTietKiem,
    sotienchuyenkhoan: sotiengui,
    sodutaikhoanchuyenkhoantruocgiaodich:
      capNhatTaiKhoanThanhToan.sodutruocgiaodich,
    sodutaikhoanchuyenkhoansaugiaodich:
      capNhatTaiKhoanThanhToan.sodusaugiaodich,
    sodutaikhoanthuhuongtruocgiaodich: 0,
    sodutaikhoanthuhuongsaugiaodich: sotiengui,
    noidung: 'Tạo sổ tiết kiệm',
    thoigian: now,
    thoigiandmy: dmy,
    loaichuyenkhoanId: 4,
  });
  if (!taoChuyenKhoan) {
    return {
      error: 'Tạo thông tin chuyển khoản thất bại',
    };
  }

  return newSotietkiem;
};

module.exports.findAll = async () => {
  let danhSachSoTietKiem = await SoTietKiem.findAll();
  if (!danhSachSoTietKiem) {
    return {
      error: 'Bảng danh sách sổ tiết kiệm rỗng',
    };
  }
  return danhSachSoTietKiem;
};

module.exports.findAllByPhone = async (khachhangSodienthoai) => {
  let danhSachSoTietKiem = await SoTietKiem.findAll({
    where: {
      khachhangSodienthoai,
    },
  });
  if (!danhSachSoTietKiem) {
    return {
      error: 'Số điện thoại không tồn tại',
    };
  }
  return danhSachSoTietKiem;
};

module.exports.findBy;
//#endregion

//#region BusService
module.exports.capNhatSoTietKiem = async () => {};

//#endregion
