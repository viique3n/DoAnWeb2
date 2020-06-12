const express = require('express');
const controller = require('../controllers/test.controller');
const router = express.Router();

router.get('/', controller.getIndex);

router.post('/', controller.postIndex);

module.exports = router;