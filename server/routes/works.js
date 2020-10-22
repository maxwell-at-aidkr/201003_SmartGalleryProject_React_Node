const express = require('express');
const router = express.Router();
const { GalleryWork } = require('../models/GalleryWork');
const multer = require('multer');

//=================================
//             Work
//=================================

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/test');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/uploadWork', (req, res) => {
  const work = new GalleryWork(req.body);

  work.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;

router.post('/getWorks', (req, res) => {
  GalleryWork.find().exec((err, workInfo) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, workInfo });
  });
});

module.exports = router;
