const { Router } = require('express');
const controller = require('../controllers/sotietkiem.controller');
const router = new Router();

router.post('/taosotietkiem', controller.postTaoSoTietKiem);
router.get('/getsotietkiem', controller.getDanhSachSoTietKiem);

module.exports = router;
