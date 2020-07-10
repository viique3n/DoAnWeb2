const LaiSuat = require('../db/models/LaiSuat.Model');

module.exports.findAll = async () => {
  const danhSachLaiSuat = await LaiSuat.findAll();
  if (!danhSachLaiSuat) {
    return {
      error: 'Danh sách lãi suất trống',
    };
  }
  return danhSachLaiSuat;
};
