const { Router } = require('express');
const controller = require('../controllers/login.controller');
const router = new Router();

router.get('/', controller.getLogin);
router.post('/', controller.postLogin);

module.exports = router;