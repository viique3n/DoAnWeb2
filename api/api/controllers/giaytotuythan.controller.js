const multer = require('multer');
const giayToTuyThanService = require('../../services/giaytotuythan.service');

module.exports.postUploadAnhGiayTo = async (req, res) => {
  const giaytoImg = req.file;
  const khachhangSodienthoai = giaytoImg.filename.split('.')[0];
  const ext = giaytoImg.filename.split('.')[1];
  console.log(`Số điện thoại khách hàng: ${khachhangSodienthoai}`);
  const giayto = await giayToTuyThanService.findBySodienthoai(
    khachhangSodienthoai
  );
  const hinhanhurl = 'uploads/' + khachhangSodienthoai + '.' + ext;
  giayto.hinhanhurl = hinhanhurl;
  const savegt = await giayto.save();
  console.log(`hình ảnh url: ${hinhanhurl}`);
  if (savegt) {
    console.log('Cap nhat thong tin giay to thanh cong');
    return res.status(200).json({
      capnhat: 'Thành công',
    });
  }
  return res.status(303).json({
    capnhat: 'Thất bại',
  });
  // console.log(giayto);
  // return res.json({ giaytoImg });
};
module.exports.postTaoGiayToTuyThan = async (req, res) => {
  const { thongtin } = req.body;
  console.log('Tạo thông tin giấy tờ');
  console.log(thongtin);
  const taogiayto = await giayToTuyThanService.taoGiayToTuyThan(thongtin);
  if (taogiayto.error) {
    return res.status(303).json({
      error: 'Không thể tạo thông tin giấy tờ',
    });
  }
  console.log('Tạo giấy tờ thành công');

  return res.status(200).json({
    taogiayto,
  });
};

module.exports.getThongTinGiayToTuyThan = async (req, res) => {
  const { sodienthoai, magiayto } = req.query;
  if (magiayto) {
    const giayto = await giayToTuyThanService.findById(magiayto);
    if (giayto.error) {
      return res.status(404).json({
        error: 'Không tìm thấy giấy tờ theo thông tin cung cấp',
      });
    }
    return res.status(200).json(giayto);
  }
  if (sodienthoai) {
    const giayto = await giayToTuyThanService.findBySodienthoai(sodienthoai);
    if (giayto.error) {
      return res.status(404).json({
        error: 'Không tìm thấy giấy tờ theo thông tin cung cấp',
      });
    }
    return res.status(200).json(giayto);
  }
  return res.status(404).json({
    error: 'Không tìm thấy giấy tờ theo thông tin cung cấp',
  });
};
