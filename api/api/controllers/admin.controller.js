//const User = require('../../db/models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const adminService = require('../../services/admin.service');
dotenv.config();

//#region auth
module.exports.postLoginAPI = async (req, res) => {
  // const nhanvienquanly = await NhanVienQuanLy.findByEmail(req.body.email);
  // if (
  //   !nhanvienquanly ||
  //   !NhanVienQuanLy.verifyPassword(req.body.matkhau, nhanvienquanly.matkhau)
  // ) {
  //   return res.status(404).json({
  //     error: true,
  //     message: 'Email or Password is Wrong',
  //   });
  // }
  // const accessToken = jwt.sign(
  //   { nhanvienquanly: nhanvienquanly },
  //   process.env.ACCESS_TOKEN_SECRET
  // );
  // /* res.header('auth-token', accessToken).send(accessToken); */
  // console.log('accesstoken');
  // console.log(accessToken);
  // res.json({
  //   nhanvienquanly: nhanvienquanly,
  //   token: accessToken,
  // });
};
//#endregion

//#region services
module.exports.getThongTinKhachHang = async (req, res) => {
  console.log('get thong tin khach hang');
  console.log(req.body);
  const conditions = {
    email: req.body.email,
    sodienthoai: req.body.sodienthoai,
    tenhienthi: req.body.tenhienthi,
    tinhtrang: req.body.tinhtrang,
  };

  const dskh = await adminService.getThongTinKhachHang(conditions);
  console.log(dskh);
  return res.status(200).json(dskh);
};

module.exports.putCapNhatTinhTrangKhachHang = async (req, res) => {
  const { email, sodienthoai, tinhtrang } = req.body;
  const conditions = {
    email,
    sodienthoai,
    tinhtrang,
  };

  const capnhat = await adminService.CapNhatTinhTrangKhachHang(conditions);
  console.log('Trang thai cap nhat');
  console.log(capnhat);

  return res.json({ capnhat });
};

module.exports.putKichHoatTaiKhoan = async (req, res) => {};
//#endregion
