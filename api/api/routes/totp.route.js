const { Router } = require('express');
const controller = require('../controllers/totp.controller');
const router = new Router();

router.post('/totp-secret', controller.postTotpSecrete);
router.post('/totp-generate', controller.postTotpGenerate);
router.post('/totp-validate', controller.postTotpValidate);
module.exports = router;
