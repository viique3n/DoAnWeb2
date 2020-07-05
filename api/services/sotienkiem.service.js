const SoTietKiem = require('../db/models/SoTietKiem.Model');

module.exports.TaoSoTietKiem = async (stk) => {
  const { sodienthoai, ngaymo, kyhan, sotiengui } = stk;
  const ngaydong = ngaymo + kyhan;
  const ngay = ngaymo.getDate();
  const thang = ngaymo.getMonth();
  const nam = ngaymo.getYear();
  const id = sodienthoai + nam + thang + ngay;

  const newsotietkiem = await SoTietKiem.create({
    mataikhoan: id,
    ngaymo: ngaymo,
    ngaydong: ngaydong,
    sotiengui: sotiengui,
  });
  return newsotietkiem;
};

module.exports.findAll = async () => {
  let danhSachSoTietKiem = await SoTietKiem.findAll();
  if (!danhSachSoTietKiem) {
    return {
      error: 'Bảng danh sách sổ tiết kiệm rỗng',
    };
    return danhSachSoTietKiem;
  }
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
