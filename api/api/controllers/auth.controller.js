const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const khachHangService = require('../../services/khachang.service');
const jwtService = require('../../services/jwt.service');

dotenv.config();

//#region  api
let refreshTokens = [];
//#region auth
module.exports.renewAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  // console.log(refreshTokens);
  // console.log('renew access token');
  // console.log(req);
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

module.exports.postSignUpAPI = async (req, res) => {
  // Kiểm tra số điện thoại hoặc email đã tồn tại hay chưa
  const khByPhone = await khachHangService.findByPhone(req.body.sodienthoai);
  if (!khByPhone.error) {
    console.log('so dien thoai da ton tai');
    return res.status(303).json({
      error: true,
      message: 'User existed',
    });
  }
  const khByEmail = await khachHangService.findByEmail(req.body.email);
  if (!khByEmail.error) {
    console.log('email da ton tai');
    return res.status(303).json({
      error: true,
      message: 'User existed',
    });
  }

  // Thêm khách hàng mới
  const thongtin = {
    sodienthoai: req.body.sodienthoai,
    email: req.body.email,
    tenhienthi: req.body.tenhienthi,
    matkhau: req.body.matkhau,
  };
  const khachhang = await khachHangService.TaoTaiKhoan(thongtin);

  // Sau khi tạo tài khoản khách hàng sẽ được mở một tài khoản thanh toán mặc định
  // console.log('khach hang');
  // console.log(khachhang);
  const accessToken = jwtService.generateAccessToken(khachhang);
  const refreshToken = jwtService.generateRefreshToken(khachhang);

  return res.json({
    refreshToken,
    token: accessToken,
  });
};

module.exports.postLoginAPI = async (req, res) => {
  console.log('login here');
  let khachhang = await khachHangService.findByPhone(req.body.sodienthoai);
  khachhang = khachhang.dataValues;
  if (
    !khachhang ||
    !khachHangService.verifyPassword(req.body.matkhau, khachhang.matkhau)
  ) {
    console.log('error');
    return res.status(404).json({
      error: true,
      message: 'Username or Password is Wrong',
    });
  }

  console.log('herre');

  const accessToken = jwtService.generateAccessToken(khachhang);
  const refreshToken = jwtService.generateRefreshToken(khachhang);
  console.log(accessToken);
  console.log(refreshToken);
  res.json({
    token: accessToken,
    refreshToken,
  });
};

//#endregion

//#region mvc
// module.exports.getLogin = async (req, res) => {
//   res.render('/login');
// };

// module.exports.postLogin = async (req, res) => {
//   var khachhang;
//   if (req.body.sodienthoai) {
//     khachhang = KhachHang.findByPhone(req.body.sodienthoai);
//   } else if (req.body.email) {
//     khachhang = KhachHang.findByEmail(req.body.email);
//   }
//   if (
//     !khachhang ||
//     KhachHang.verifyPassword(req.body.matkhau, khachhang.matkhau)
//   ) {
//     console.log('mat khau khong hop le');
//     return;
//   }
//   const accessToken = jwt.sign(
//     { khachhang: khachhang },
//     process.env.ACCESS_TOKEN_SECRET
//   );
//   localStorage.setItem('jwtToken', accessToken);
//   localStorage.setItem('khachhang', khachhang);
//   res.render('/', { accessToken });
// };

// module.exports.getSignUp = async (req, res) => {
//   res.render('signup');
// };
// module.exports.postSignUp = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     console.log(errors);
//     return res.status(422).render('signup', { errors });
//   }

//   const khachhang = await KhachHang.create({
//     email: req.body.email,
//     sodienthoai: req.body.sodienthoai,
//     tenhienthi: req.body.tenhienthi,
//     matkhau: User.hashPassword(req.body.matkhau),
//     token: crypto.randomBytes(3).toString('hex').toUpperCase(),
//   });
//   console.log(`email: ${user.email} + token: ${user.token}`);
//   await Email.send(
//     user.email,
//     'Ma kich hoat tai khoan',
//     `${process.env.BASE_URL}/login/${user.id}/${user.token}`
//   );

//   res.redirect('/');
// };
//#endregion
