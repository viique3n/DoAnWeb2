const KhachHang = require('../db/models/KhachHang.Model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Op } = require('sequelize');

//#region Authentication
module.exports.findAll = async (filter) => {
  const { tenhienthi, tinhtrang } = filter;
  console.log('filter khachhang');
  console.log(filter);
  console.log(typeof filter);
  console.log(tenhienthi);
  console.log(tinhtrang);
  let dsKhachHang;
  if (!tenhienthi && !tinhtrang) {
    dsKhachHang = await KhachHang.findAll();
  } else if (!tenhienthi) {
    dsKhachHang = await KhachHang.findAll({
      where: {
        tinhtrang,
      },
    });
  } else if (!tinhtrang) {
    dsKhachHang = await KhachHang.findAll({
      where: {
        tenhienthi: {
          [Op.like]: `%${tenhienthi}%`,
        },
      },
    });
  } else {
    dsKhachHang = await KhachHang.findAll({
      where: {
        tenhienthi: {
          [Op.like]: `%${tenhienthi}%`,
        },
        tinhtrang,
      },
    });
  }
  if (!dsKhachHang) {
    return { error: 'Không tồn tại khách hàng với thông tin theo yêu cầu' };
  }
  return dsKhachHang;
};

module.exports.findByPhone = async (sodienthoai) => {
  const khachhang = await KhachHang.findOne({
    where: {
      sodienthoai: {
        [Op.like]: `%${sodienthoai}%`,
      },
    },
  });

  if (!khachhang) {
    return { error: 'Số điện thoại không tồn tại' };
  }

  return khachhang;
};

module.exports.findByEmail = async (email) => {
  const khachhang = await KhachHang.findOne({
    where: {
      email: {
        [Op.like]: `%${email}%`,
      },
    },
  });

  if (!khachhang) {
    return { error: 'Email không tồn tại' };
  }

  return khachhang;
};

const hashPassword = (module.exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
});

module.exports.verifyPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

module.exports.TaoTaiKhoan = async (khachhang) => {
  const newkhachhang = await KhachHang.create({
    sodienthoai: khachhang.sodienthoai,
    email: khachhang.email,
    tenhienthi: khachhang.tenhienthi,
    matkhau: hashPassword(khachhang.matkhau),
    tinhtrang: 'Chưa xác thực',
    token: crypto.randomBytes(3).toString('hex').toUpperCase(),
  });
  return newkhachhang;
};
//#endregion

module.exports.CapNhatMatKhau = async (filter) => {
  const { sodienthoai, email, matkhaumoi } = filter;
  let khachhang;
  if (!sodienthoai && !email) {
    return {
      error: 'Yêu cầu email hoặc số điện thoại',
    };
  }
  if (!sodienthoai) {
    khachhang = await KhachHang.findOne({
      where: {
        emai,
      },
    });
  } else if (!email) {
    khachhang = await KhachHang.findOne({
      where: { sodienthoai },
    });
  }

  if (!khachhang) {
    return {
      error: 'Tài khoản không tồn tại',
    };
  }

  const matkhau = hashPassword(matkhaumoi);
  // Cập nhật mật khẩu
  khachhang.matkhau = matkhau;
  const result = await khachhang.save();
  return result;
};

module.exports.CapNhatTinhTrang = async (filter) => {
  const { sodienthoai, email, tinhtrang } = filter;
  let khachhang;
  if (!sodienthoai && !email) {
    return {
      error: 'Yêu cầu email hoặc số điện thoại',
    };
  }
  if (!sodienthoai) {
    khachhang = await KhachHang.findOne({
      where: {
        email,
      },
    });
  } else if (!email) {
    khachhang = await KhachHang.findOne({
      where: { sodienthoai },
    });
  }

  if (!khachhang) {
    return {
      error: 'Tài khoản không tồn tại',
    };
  }

  // Cập nhật tình trạng
  khachhang.tinhtrang = tinhtrang;
  const result = await khachhang.save();
  return result;
};

module.exports.CapNhatTenHienThi = async (filter) => {
  const { sodienthoai, email, tenhienthi } = filter;
  let khachhang;
  if (!sodienthoai && !email) {
    return {
      error: 'Yêu cầu email hoặc số điện thoại',
    };
  }
  if (!sodienthoai) {
    khachhang = await KhachHang.findOne({
      where: {
        emai,
      },
    });
  } else if (!email) {
    khachhang = await KhachHang.findOne({
      where: { sodienthoai },
    });
  }

  if (!khachhang) {
    return {
      error: 'Tài khoản không tồn tại',
    };
  }

  // Cập nhật tên hiển thị
  khachhang.tenhienthi = tenhienthi;
  const result = await khachhang.save();
  return result;
};
