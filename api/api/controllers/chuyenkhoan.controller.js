const chuyenKhoanService = require('../../services/chuyenkhoan.service');

module.exports.getThongTinChuyenKhoan = async (req, res) => {
  console.log('get lịch sử giao dịch');
  const { danhsachtaikhoanthanhtoan } = req.query;
  console.log('danh sach tai khoan thanh toan');
  console.log(danhsachtaikhoanthanhtoan);

  let lichsugiaodich = [];
  // await danhsachtaikhoanthanhtoan.map(async (taikhoan) => {
  //   const giaodich = await chuyenKhoanService.lichSuGiaoGich(taikhoan);
  //   console.log(`lịch sử giao dịch của tài khoản ${taikhoan}`);
  //   // console.log(giaodich);
  //   lichsugiaodich = lichsugiaodich.concat(giaodich);
  //   // console.log(lichsugiaodich);
  // });
  let i;
  for (i = 0; i < danhsachtaikhoanthanhtoan.length; i++) {
    const giaodich = await chuyenKhoanService.lichSuGiaoGich(
      danhsachtaikhoanthanhtoan[i]
    );
    lichsugiaodich = lichsugiaodich.concat(giaodich);
  }
  console.log('------------------Lịch sử giao dịch---------------------');
  console.log(lichsugiaodich);
  if (typeof lichsugiaodich !== 'undefined' && lichsugiaodich.length > 0) {
    return res.status(200).json({
      lichsugiaodich,
    });
  }
  return res.status(404).json({
    error: 'Không tồn tại lịch sử giao dịch',
  });
};

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
