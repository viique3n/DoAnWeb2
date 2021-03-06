const KhachHang = require('../db/models/KhachHang.Model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Op } = require('sequelize');

//#region BaseService
module.exports.findAll = async (filter) => {
  const { tenhienthi, tinhtrang, email, sodienthoai } = filter;
  console.log('filter khachhang');
  console.log(filter);

  let dsKhachHang;
  if (!tenhienthi && !email && !sodienthoai && !tinhtrang) {
    console.log('rong');
    dsKhachHang = await KhachHang.findAll();
  } else if (tinhtrang === '') {
    if (email) {
      console.log('email = 0 tinh trang = all');
      dsKhachHang = await KhachHang.findAll({
        where: {
          email: {
            [Op.like]: `%${email}%`,
          },
        },
      });
      console.log(dsKhachHang);
    } else if (sodienthoai) {
      dsKhachHang = await KhachHang.findAll({
        where: {
          sodienthoai: {
            [Op.like]: `%${sodienthoai}%`,
          },
        },
      });
    } else if (tenhienthi) {
      console.log('ten hien thi = 5 tinh trang = all');
      dsKhachHang = await KhachHang.findAll({
        where: {
          tenhienthi: {
            [Op.like]: `%${tenhienthi}%`,
          },
        },
      });
    }
  } else if (tinhtrang !== '') {
    if (email) {
      dsKhachHang = await KhachHang.findAll({
        where: {
          email: {
            [Op.like]: `%${email}%`,
          },
          tinhtrang,
        },
      });
    } else if (sodienthoai) {
      dsKhachHang = await KhachHang.findAll({
        where: {
          sodienthoai: {
            [Op.like]: `%${sodienthoai}%`,
          },
          tinhtrang,
        },
      });
    } else if (tenhienthi) {
      dsKhachHang = await KhachHang.findAll({
        where: {
          tenhienthi: {
            [Op.like]: `%${tenhienthi}%`,
          },
          tinhtrang,
        },
      });
    } else {
      console.log('here');
      dsKhachHang = await KhachHang.findAll({
        where: {
          tinhtrang,
        },
      });
    }
  }

  if (!dsKhachHang) {
    return { error: 'Không tồn tại khách hàng với thông tin theo yêu cầu' };
  }
  // console.log(dsKhachHang);
  return dsKhachHang;
};

module.exports.findByPhone = async (sodienthoai) => {
  const khachhang = await KhachHang.findOne({
    where: {
      sodienthoai,
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
      email,
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

module.exports.taoTaiKhoan = async (khachhang) => {
  const {
    sodienthoai,
    email,
    tenhienthi,
    matkhau,
    doituongkhachhangId,
  } = khachhang;
  const newkhachhang = await KhachHang.create({
    sodienthoai,
    email,
    tenhienthi,
    matkhau: hashPassword(matkhau),
    tinhtrang: 'Chưa xác thực',
    token: crypto.randomBytes(3).toString('hex').toUpperCase(),
    doituongkhachhangId,
  });
  return newkhachhang;
};
//#endregion

//#region BusService
module.exports.capNhatMatKhau = async (filter) => {
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

module.exports.capNhatTinhTrang = async (filter) => {
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

module.exports.capNhatTenHienThi = async (filter) => {
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
//#endregion
