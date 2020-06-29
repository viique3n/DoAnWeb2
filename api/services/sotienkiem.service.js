const SoTietKiem = require('../db/models/SoTietKiem.Model');

module.exports.TaoSoTietKiem = async (stk) => {
  const { sodienthoai, ngaymo, kyhan, sotiengui } = stk.ngaymo;
  const ngaydong = ngaymo + kyhan;
  const ngay = ngaymo.getDate();
  const thang = ngaymo.getMonth();
  const nam = ngaymo.getYear();
  const id = sodienthoai + nam + thang + ngay;

  const sotietkiem = await SoTietKiem.create({
    mataikhoan: id,
    ngaymo: ngaymo,
    ngaydong: ngaydong,
    sotiengui: sotiengui,
  });
};
