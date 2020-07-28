const soTietKiemService = require('../../services/sotienkiem.service');

module.exports.getDanhSachSoTietKiem = async (req, res) => {
  console.log('get danh sách sổ tiết kiệm');
  console.log('request params');
  console.log(req.query);
  const { khachhangSodienthoai, tinhtrang } = req.query;
  if (khachhangSodienthoai) {
    const dsstk = await soTietKiemService.findAllByPhone(
      khachhangSodienthoai,
      tinhtrang
    );
    if (dsstk.error) {
      return res.status(404).json({
        error: 'Khách hàng không có số tiết kiệm',
      });
    }
    return res.json(dsstk);
  }
  const dsstk = await soTietKiemService.findAll();
  if (dsstk.error) {
    return res.status(404).json({
      error: 'Không có dữ liệu sổ tiết kiệm',
    });
  }
  return res.status(200).json(dsstk);
};
module.exports.postTaoSoTietKiem = async (req, res) => {
  const { sotietkiem } = req.body;
  console.log('thong tin so tiet kiem');
  // console.log(sotietkiem);
  // console.log(req.body);

  const newSoTietKiem = await soTietKiemService.taoSoTietKiem(sotietkiem);
  if (newSoTietKiem.error) {
    return res.status(303).json({
      error: 'Không thể tạo sổ tiết kiệm',
    });
  }

  return res.json(newSoTietKiem);
};

module.exports.postRutTienTietKiem = async (req, res) => {
  console.log('Rút tiền tiết kiệm Controller');
  const { thongtin } = req.body;
  const ruttien = await soTietKiemService.rutTienTietKiem(thongtin);
  console.log(ruttien);
  if (ruttien.error) {
    return res.status(404).json({
      tinhtrang: 'Không tìm thấy thông tin sổ tiết kiệm cần cập nhật',
    });
  }
  return res.status(200).json({
    tinhtrang: 'Cập nhật thông tin thành công',
  });
};
