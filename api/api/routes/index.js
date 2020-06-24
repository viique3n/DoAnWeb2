var express = require('express');
var router = express.Router();
var verify = require('../../middlewares/verifyToken');


/* GET home page. */
router.get('/', verify, function(req, res) {
  console.log('req.user');
  console.log(req.user);
  res.json({
    posts: {
      title: 'index post',
      description: 'something ....'
    }
  });
});

module.exports = router;
