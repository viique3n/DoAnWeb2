const HanMucGiaoDich = require('../db/models/HanMucGiaoDich.Model');
const khachHangService = require('../services/khachang.service');

//#region BaseService
module.exports.findAll = async () => {
  const hanmuc = HanMucGiaoDich.findAll();
  return hanmuc;
};

module.exports.findByKhachHang = async (sodienthoai) => {
  const khachhang = await khachHangService.findByPhone(sodienthoai);
  const { doituongkhachhangId } = khachhang;
  const danhsachhanmuc = HanMucGiaoDich.findOne({
    where: {
      doituongkhachhangId,
    },
  });
  return danhsachhanmuc;
};

// Tương đương với findByID
module.exports.findByLoaiChuyenKhoanVaDoiTuongKhachHang = async (
  loaichuyenkhoanId,
  doituongkhachhangId
) => {
  // Hạn mức giao dịch được xác định bởi loại chuyển khoản và đối tượng khách hàng
  const hanmuc = HanMucGiaoDich.findOne({
    where: {
      loaichuyenkhoanId,
      doituongkhachhangId,
    },
  });
  if (!hanmuc) {
    return {
      error: 'Loại chuyển khoản hoặc đối tượng khách hàng không hợp lệ',
    };
  }
  return hanmuc;
};
//#endregion
