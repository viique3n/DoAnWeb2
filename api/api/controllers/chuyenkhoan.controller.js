const chuyenKhoanService = require('../../services/chuyenkhoan.service');

module.exports.postChuyenKhoan = async (req, res) => {
  const {
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    noidung,
    thoigian,
    loaichuyenkhoanId,
  } = req.body;
  const thongtinchuyenkhoan = {
    mataikhoanchuyenkhoan,
    mataikhoanthuhuong,
    sotienchuyenkhoan,
    noidung,
    thoigian,
    loaichuyenkhoanId,
  };
  // console.log('thong tin chuyen khoan');
  // console.log(thongtinchuyenkhoan);
  const kiemtra = await chuyenKhoanService.chuyenKhoanNoiBo(
    thongtinchuyenkhoan
  );
  if (kiemtra.thanhcong) {
    return res.status(200).json({
      thanhcong: kiemtra.thanhcong,
    });
  } else {
    return res.status(400).json({
      errors: kiemtra.errors,
    });
  }
};
