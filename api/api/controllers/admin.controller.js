const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const adminService = require('../../services/admin.service');
const jwtService = require('../../services/jwt.service');
dotenv.config();

// need to insert to database later
let refreshTokens = [];
//#region auth
module.exports.renewAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) {
    console.log('refresh token null');
    return res.status(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
    console.log('some error');
    return res.status(403);
  }
  // console.log('verify token');

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, khachhang) => {
      if (err) {
        return res.status(403);
      }
      const accessToken = jwtService.generateAccessToken(khachhang);
      // console.log(accessToken);
      return res.json({
        accessToken,
      });
    }
  );
};

module.exports.postLoginAPI = async (req, res) => {
  let nhanvienquanly = await adminService.findByEmail(req.body.email);
  nhanvienquanly = nhanvienquanly.dataValues;
  // console.log(nhanvienquanly);
  if (
    !nhanvienquanly ||
    !adminService.verifyPassword(req.body.matkhau, nhanvienquanly.matkhau)
  ) {
    return res.status(404).json({
      error: true,
      message: 'Email or Password is Wrong',
    });
  }
  const accessToken = jwtService.generateAccessToken(nhanvienquanly);
  const refreshToken = jwtService.generateRefreshToken(nhanvienquanly);
  refreshTokens.push(refreshToken);
  res.json({
    token: accessToken,
    refreshToken,
  });
};
//#endregion

//#region services
module.exports.getThongTinKhachHang = async (req, res) => {
  let { filter } = req.query;
  filter = JSON.parse(filter);

  const dskh = await adminService.getThongTinKhachHang(filter);
  // console.log(dskh);
  return res.status(200).json(dskh);
};

module.exports.getThongTinGiayTo = async (req, res) => {
  const { sodienthoai } = req.query;
  console.log('get thông tin giấy tờ tùy thân');
  console.log(`số điện thoại: ${sodienthoai}`);
  const giayto = await adminService.getThongTinKhachHangGiayToTuyThan(
    sodienthoai
  );
  if (giayto.error) {
    return res.status(404).json({
      error: 'Không tìm thấy thông tin',
    });
  }
  return res.status(200).json(giayto);
};

module.exports.putCapNhatTinhTrangKhachHang = async (req, res) => {
  console.log('put cap nhat tinh trang khach hang controller');
  console.log(req.body);
  const { email, sodienthoai, tinhtrang } = req.body;
  const filter = {
    email,
    sodienthoai,
    tinhtrang,
  };

  console.log(
    `Email: ${email} --- Số điện thoại: ${sodienthoai} --- Tình trạng: ${tinhtrang}`
  );
  if (tinhtrang === 'Đã xác thực') {
    console.log('Xác thực tài khoản');
    const thongtin = {
      sodienthoai,
      tinhtrang: 'Đã kích hoạt',
    };
    const capnhat = await adminService.capNhatTinhTrangKhachHang(filter);
    const capnhatTaiKhoanThanhToan = await adminService.capNhatTinhTrangTaiKhoanThanhToan(
      thongtin
    );
    if (!capnhat.error && !capnhatTaiKhoanThanhToan.error) {
      return res.json({
        tinhtrancapnhat: 'Cập nhật thành công',
      });
    }
  } else {
    const capnhat = await adminService.capNhatTinhTrangKhachHang(filter);
    console.log('Trang thai cap nhat');
    console.log(capnhat);

    return res.json({ capnhat });
  }
};

module.exports.putKichHoatTaiKhoan = async (req, res) => {};
//#endregion
