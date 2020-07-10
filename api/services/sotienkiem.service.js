const SoTietKiem = require('../db/models/SoTietKiem.Model');

//#region BaseService
function generateMaSoTietKiem() {}

module.exports.TaoSoTietKiem = async (sotietkiem) => {
  //
  const {
    ngaymo,
    sotiengui,
    kyhan,
    tienlai,
    tinhtrang,
    laisuatId,
    taikhoanthanhtoanMataikhoan,
    khachhangSodienthoai,
  } = sotietkiem;

  const maSoTietKiem = generateMaSoTietKiem();
  const ngaydong = '';

  const newSotietkiem = await SoTietKiem.create({
    id: maSoTietKiem,
    ngaymo,
    ngaydong,
    sotiengui,
    kyhan,
    tienlai,
    tinhtrang,
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
