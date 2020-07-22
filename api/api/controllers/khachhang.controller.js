const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const khachHangService = require('../../services/khachang.service');
const taiKhoanThanhToanService = require('../../services/taikhoan.service');
const refreshtokenService = require('../../services/refreshtoken.service');
const jwtService = require('../../services/jwt.service');

dotenv.config();

//#region  api
//#region auth
module.exports.renewAccessToken = (req, res) => {
  console.log('renew here');
  const refreshToken = req.body.refreshToken;
  // console.log(refreshTokens);
  // console.log('renew access token');
  // console.log(req);
  if (!refreshToken) {
    console.log('refresh token null');
    return res.status(401);
  }
  const isValidToken = refreshtokenService.findToken(refreshToken);
  if (isValidToken.error) {
    return res.status(403);
  }

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

module.exports.postSignUpAPI = async (req, res) => {
  // Kiểm tra số điện thoại hoặc email đã tồn tại hay chưa
  const { sodienthoai, email, tenhienthi, matkhau } = req.body;
  const khByPhone = await khachHangService.findByPhone(sodienthoai);
  if (!khByPhone.error) {
    console.log('so dien thoai da ton tai');
    return res.status(303).json({
      error: true,
      message: 'User existed',
    });
  }
  const khByEmail = await khachHangService.findByEmail(email);
  if (!khByEmail.error) {
    console.log('email da ton tai');
    return res.status(303).json({
      error: true,
      message: 'User existed',
    });
  }

  // Thêm khách hàng mới
  const thongtin = {
    sodienthoai,
    email,
    tenhienthi,
    matkhau,
    doituongkhachhangId: 1,
  };
  const khachhang = await khachHangService.taoTaiKhoan(thongtin);
  console.log('them khach hang thanh cong');
  // Sau khi tạo tài khoản khách hàng sẽ được mở một tài khoản thanh toán mặc định
  const mataikhoan = taiKhoanThanhToanService.generateMaTaiKhoan(sodienthoai);
  console.log(mataikhoan);
  const taikhoan = {
    mataikhoan,
    donvitiente: 'VND',
    sodu: 0,
    tinhtrang: 'Chưa kích hoạt',
    token: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    khachhangSodienthoai: sodienthoai,
  };
  const tktt = await taiKhoanThanhToanService.taoTaiKhoan(taikhoan);
  // console.log(tktt);
  if (!tktt) {
    console.log('tao tai khoan thanh toan that bai');
    return res.status(500).json({
      error: 'Server Error',
    });
  }

  // console.log('khach hang');
  // console.log(khachhang);
  console.log('still oke');
  console.log(khachhang);
  const accessToken = jwtService.generateAccessToken(khachhang.dataValues);
  console.log(accessToken);
  const refreshToken = jwtService.generateRefreshToken(khachhang.dataValues);
  const newToken = refreshtokenService.taoToken(refreshToken);

  if (newToken.error) {
    return res.status(404).json({
      error: true,
      message: 'Username or Password is Wrong',
    });
  }
  // console.log(refreshToken);
  // console.log('still oke');

  return res.json({
    refreshToken,
    token: accessToken,
  });
};

module.exports.postLoginAPI = async (req, res) => {
  console.log('login here');
  console.log(req.body);
  const { sodienthoai, matkhau } = req.body;
  let khachhang = await khachHangService.findByPhone(sodienthoai);
  khachhang = khachhang.dataValues;
  if (
    !khachhang ||
    !khachHangService.verifyPassword(matkhau, khachhang.matkhau)
  ) {
    console.log('error');
    return res.status(404).json({
      error: true,
      message: 'Username or Password is Wrong',
    });
  }

  // console.log('herre');

  const accessToken = jwtService.generateAccessToken(khachhang);
  const refreshToken = jwtService.generateRefreshToken(khachhang);
  const newToken = refreshtokenService.taoToken(refreshToken);
  if (newToken.error) {
    return res.status(404).json({
      error: true,
      message: 'Username or Password is Wrong',
    });
  }
  // console.log(accessToken);
  // console.log(refreshToken);
  res.header('Access-Control-Allow-Origin', '*');
  res.json({
    token: accessToken,
    refreshToken,
  });
};

module.exports.getThongTinKhachHang = async (req, res) => {
  console.log('reqquery');
  console.log(req.query);
  let { sodienthoai } = req.query;

  const kh = await khachHangService.findByPhone(sodienthoai);
  // console.log(dskh);
  return res.status(200).json(kh);
};
//#endregion
