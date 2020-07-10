const { Router } = require('express');
const controller = require('../controllers/laisuat.controller');
const router = new Router();

router.get('/getdanhsachlaisuat', controller.getDanhSachLaiSuat);

module.exports = router;
