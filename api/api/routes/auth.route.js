const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const router = new Router();
var verify = require('../../middlewares/verifyToken');
var verifySignUp = require('../../middlewares/validateSignUp');

// router.post('/signup', controller.postSignUp);
router.post('/login', controller.postLoginAPI);
router.post('/signup', controller.postSignUpAPI);
// router.get('/me/from/token', verify, controller.getUserFromToken);

// router.get('/login', controller.getLogin);
// router.post('/login', controller.postLogin);
// router.get('/signup', verifySignUp, controller.getSignUp);
// router.post('/signup', controller.postSignUp);

module.exports = router;
