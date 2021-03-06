const { Router } = require('express');
const controller = require('../controllers/admin.controller');
const router = new Router();

router.post('/login', controller.postLoginAPI);
router.get('/thongtinkhachhang', controller.getThongTinKhachHang);
router.put(
  '/capnhattinhtrangkhachhang',
  controller.putCapNhatTinhTrangKhachHang
);
router.get('/thongtinkhachhanggiaytotuythan', controller.getThongTinGiayTo);
router.post('/renewacesstoken', controller.renewAccessToken);

module.exports = router;
