const khachHangService = require('../../services/khachang.service');
const taiKhoanService = require('../../services/taikhoan.service');
module.exports.postTaoTaiKhoanThanhToan = async (req, res) => {
  const { taikhoan } = req.body;
  const newTaiKhoan = await taiKhoanService.TaoTaiKhoan(taikhoan);

  if (newTaiKhoan.error) {
    return res.status(303).json({
      error: newTaiKhoan.error,
    });
  }

  return res.status(200).json({
    newTaiKhoan,
  });
};
module.exports.postMoSoTietKiem = async (req, res) => {};
module.exports.getDanhSachTaiKhoanThanhToan = async (req, res) => {
  let { khachhangSodienthoai } = req.query;
  khachhangSodienthoai = JSON.parse(khachhangSodienthoai);
  const dstk = taiKhoanService.findAllByPhone(khachhangSodienthoai);
  if (dstk.error) {
    return res.status(404).json({
      error: dstk.error,
    });
  }
  return res.status(200).json({
    dstk,
  });
};
