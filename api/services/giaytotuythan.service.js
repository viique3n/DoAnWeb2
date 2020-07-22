const GiayToTuyThan = require('../db/models/GiayToTuyThan.Model');

module.exports.findById = async (magiayto) => {
  const giayto = await GiayToTuyThan.findByPk(magiayto);
  if (!giayto) {
    return {
      error: 'Không tìm thấy thông tin theo mã số cung cấp',
    };
  }
  return giayto;
};

module.exports.findBySodienthoai = async (sodienthoai) => {
  const giayto = await GiayToTuyThan.findOne({
    where: {
      khachhangSodienthoai: sodienthoai,
    },
  });
  if (!giayto) {
    return {
      error: 'Không tìm thấy thông tin theo mã số cung cấp',
    };
  }
  return giayto;
};

module.exports.taoGiayToTuyThan = async (thongtin) => {
  const {
    magiayto,
    ngaycap,
    hinhanhurl,
    loaigiaytoId,
    khachhangSodienthoai,
  } = thongtin;

  const giayto = await GiayToTuyThan.create({
    magiayto,
    ngaycap,
    hinhanhurl,
    loaigiaytoId,
    khachhangSodienthoai,
    createAt: new Date(),
    updatedAt: new Date(),
  });
  if (!giayto) {
    return {
      error: 'Không thể tạo giấy thông tin giấy tờ tùy thân',
    };
  }
  return giayto;
};
