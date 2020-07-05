const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const router = new Router();

router.post('/login', controller.postLoginAPI);
router.post('/signup', controller.postSignUpAPI);

module.exports = router;
