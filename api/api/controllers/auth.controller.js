const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const khachHangService = require('../../services/khachang.service');

dotenv.config();

//#region  api
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
  console.log('khach hang');
  console.log(khachhang);
  const accessToken = jwt.sign(
    { khachhang: khachhang },
    process.env.ACCESS_TOKEN_SECRET
  );

  return res.json({
    khachhang: khachhang,
    token: accessToken,
  });
};

module.exports.postLoginAPI = async (req, res) => {
  const khachhang = await khachHangService.findByPhone(req.body.sodienthoai);
  console.log(khachhang);
  if (
    !khachhang ||
    !khachHangService.verifyPassword(req.body.matkhau, khachhang.matkhau)
  ) {
    return res.status(404).json({
      error: true,
      message: 'Username or Password is Wrong',
    });
  }
  const accessToken = jwt.sign(
    { khachhang: khachhang },
    process.env.ACCESS_TOKEN_SECRET
  );
  /* res.header('auth-token', accessToken).send(accessToken); */
  console.log('accesstoken');
  console.log(accessToken);
  res.json({
    khachhang: khachhang,
    token: accessToken,
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
