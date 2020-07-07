const { Router } = require('express');
const controller = require('../controllers/chuyenkhoan.controller');
const router = new Router();

router.post('/chuyenkhoan', controller.postChuyenKhoan);

module.exports = router;
