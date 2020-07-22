const taiKhoanService = require('../../services/taikhoan.service');

module.exports.postThemTaiKhoan = async (req, res) => {
  console.log('postThemTaiKhoan');
  const { taikhoan } = req.body;
  console.log(taikhoan);
  const kt = await taiKhoanService.TaoTaiKhoan(taikhoan);
  if (!kt) {
    console.log(kt);
    return res.status(303).json({
      errors: 'them tai khoan that bai',
    });
  }
  return res.status(200).json({
    taikhoan: kt,
  });
};

module.exports.getThongTinTaiKhoan = async (req, res) => {
  console.log('thong tin tim kiem');
  console.log(req.query);
  const { mataikhoan, khachhangSodienthoai, thongtintimkiem } = req.query;
  if (mataikhoan) {
    console.log('get thong tin tai khoan');
    const taikhoan = await taiKhoanService.findById(mataikhoan);
    if (!taikhoan) {
      return res.status(404).json({
        errors: ' Không tìm thấy tài khoản  !! ',
      });
    }
    return res.status(200).json({
      taikhoan,
    });
  } else if (khachhangSodienthoai) {
    const danhSachTaiKhoan = await taiKhoanService.findAllByPhone(
      khachhangSodienthoai
    );
    if (!danhSachTaiKhoan || danhSachTaiKhoan.error) {
      return res.status(404).json({
        errors: 'Số điện thoại không tồn tại , không tìm thấy tài khoản !! ',
      });
    }
    return res.status(200).json({
      danhSachTaiKhoan,
    });
  } else if (thongtintimkiem) {
    let taikhoan = await taiKhoanService.findAllByPhone(thongtintimkiem);
    if (taikhoan && !taikhoan.error) {
      return res.json({
        taikhoan,
      });
    }

    taikhoan = await taiKhoanService.findById(thongtintimkiem);
    console.log('tìm tài khoản theo id');
    console.log(taikhoan.error);

    if (taikhoan && !taikhoan.error) {
      return res.json({
        taikhoan,
      });
    }

    taikhoan = await taiKhoanService.findAllByEmail(thongtintimkiem);
    console.log('tìm tài khoản theo email');
    console.log(taikhoan);
    if (taikhoan && !taikhoan.error) {
      return res.json({
        taikhoan,
      });
    }
    return res.status(404).json({
      error: 'Không tìm thấy tài khoản theo thông tin yêu cầu',
    });
  } else {
    const danhSachTaiKhoan = await taiKhoanService.findAll();
    if (!danhSachTaiKhoan) {
      return res.status(404).json({
        errors: 'Danh sách tài khoản rỗng  ',
      });
    }
    return res.status(200).json({
      danhSachTaiKhoan,
    });
  }
};

module.exports.putcapNhatThongTinTaiKhoan = async (req, res) => {
  console.log(req.body);
  const { email, sodienthoai, tinhtrang } = req.body;
  const filter = {
    email,
    sodienthoai,
    tinhtrang,
  };

  const capnhat = await adminService.putcapNhatThongTinTaiKhoan(filter);
  console.log('Trang thai cap nhat');
  console.log(capnhat);

  return res.json({ capnhat });
};

module.exports.getDanhSachTaiKhoanThanhToan = async (req, res) => {
  let { khachhangSodienthoai } = req.query;
  // console.log(req.query);
  // console.log(typeof req.query);
  // khachhangSodienthoai = JSON.parse(khachhangSodienthoai);
  const dstk = await taiKhoanService.findAllByPhone(khachhangSodienthoai);
  if (dstk.error) {
    return res.status(404).json({
      error: dstk.error,
    });
  }
  return res.status(200).json(dstk);
};
