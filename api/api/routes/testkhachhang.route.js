const { Router } = require('express');
const controller = require('../controllers/taikhoan.controller');
const router = new Router();

router.post('/taotaikhoanthanhtoan', controller.postTaoTaiKhoanThanhToan);
router.post('/mosotietkiem', controller.postMoSoTietKiem);
router.get(
  '/getdanhsachtaikhoanthanhtoan',
  controller.getDanhSachTaiKhoanThanhToan
);
module.exports = router;
