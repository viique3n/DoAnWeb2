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
  const { mataikhoan, khachhangSodienthoai } = req.query;
  if (mataikhoan) {
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
    if (!danhSachTaiKhoan) {
      return res.status(404).json({
        errors: 'Số điện thoại không tồn tại , không tìm thấy tài khoản !! ',
      });
    }
    return res.status(200).json({
      danhSachTaiKhoan,
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
  console.log(req.query);
  console.log(typeof req.query);
  // khachhangSodienthoai = JSON.parse(khachhangSodienthoai);
  const dstk = await taiKhoanService.findAllByPhone(khachhangSodienthoai);
  if (dstk.error) {
    return res.status(404).json({
      error: dstk.error,
    });
  }
  return res.status(200).json(dstk);
};
