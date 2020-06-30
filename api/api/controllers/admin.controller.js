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
  console.log(refreshTokens);
  console.log('renew access token');
  // console.log(req);
  if (refreshToken == null) {
    console.log('refresh token null');
    return res.status(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
    console.log('some error');
    return res.status(403);
  }
  console.log('verify token');

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, khachhang) => {
      if (err) {
        return res.status(403);
      }
      const accessToken = jwtService.generateAccessToken(khachhang);
      console.log(accessToken);
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
  /* res.header('auth-token', accessToken).send(accessToken); */
  console.log('accesstoken');
  console.log(accessToken);
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
  console.log('get thong tin khach hang');
  console.log(filter);
  console.log(typeof filter);
  // const filter = {
  //   email: req.query.email,
  //   sodienthoai: req.query.sodienthoai,
  //   tenhienthi: req.query.tenhienthi,
  //   tinhtrang: req.query.tinhtrang,
  // };

  const dskh = await adminService.getThongTinKhachHang(filter);
  // console.log(dskh);
  return res.status(200).json(dskh);
};

module.exports.putCapNhatTinhTrangKhachHang = async (req, res) => {
  const { email, sodienthoai, tinhtrang } = req.body;
  const filter = {
    email,
    sodienthoai,
    tinhtrang,
  };

  const capnhat = await adminService.CapNhatTinhTrangKhachHang(filter);
  console.log('Trang thai cap nhat');
  console.log(capnhat);

  return res.json({ capnhat });
};

module.exports.putKichHoatTaiKhoan = async (req, res) => {};
//#endregion
