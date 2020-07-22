const { Router } = require('express');
const controller = require('../controllers/giaytotuythan.controller');
const router = new Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  '/uploadanhgiayto',
  upload.single('giayto'),
  controller.postUploadAnhGiayTo
);
router.post('/taothongtingiayto', controller.postTaoGiayToTuyThan);
router.get('/getthongtingiayto', controller.getThongTinGiayToTuyThan);

module.exports = router;
