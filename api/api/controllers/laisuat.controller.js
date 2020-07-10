const laiSuatService = require('../../services/laisuat.service');

module.exports.getDanhSachLaiSuat = async (req, res) => {
  const danhSachLaiSuat = await laiSuatService.findAll();
  if (danhSachLaiSuat.error) {
    return res.status(404).json({
      error: 'Danh sách lãi suất trống',
    });
  }
  return res.status(200).json(danhSachLaiSuat);
};
