const { body } = require('express-validator');

module.exports = function (req, res, next) {
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .custom(async function (email) {
        const foundKh = await KhachHang.findByEmail(email);
        if (foundKh) {
          throw Error('email da ton tai');
        }
        return true;
      }),
    body('sodienthoai')
      .isMobilePhone()
      .custom(async function (sdt) {
        const foundKh = await KhachHang.findByPhone(sdt);
        if (foundKh) {
          throw Error('so dien thoai da ton tai');
        }
        return true;
      }),
    body('tenhienthi').trim().notEmpty(),
    body('matkhau').isLength(6),
  ];
};
