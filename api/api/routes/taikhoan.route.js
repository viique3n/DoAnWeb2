const { Router } = require('express');
const controller = require('../controllers/taikhoan.controller');
const router = new Router();

router.get(
  '/getdanhsachtaikhoanthanhtoan',
  controller.getDanhSachTaiKhoanThanhToan
);
router.post('/themtaikhoan', controller.postThemTaiKhoan);
router.get('/getthongtintaikhoan', controller.getThongTinTaiKhoan);
router.put('/updatethongtintaikhoan', controller.putcapNhatThongTinTaiKhoan);
module.exports = router;
