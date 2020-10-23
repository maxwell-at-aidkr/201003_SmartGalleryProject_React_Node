const express = require('express');
const router = express.Router();
const path = require('path');
const { GalleryWork } = require('../models/GalleryWork');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');

//=================================
//             Work
//=================================

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// let upload = multer({ storage: storage });

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smartgallerystorage',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
});

router.post('/image', upload.single('file'), function (req, res, next) {
  let file = req.file;

  console.log('file', file);

  let result = {
    success: true,
    filePath: file.path,
    fileName: file.filename,
  };

  res.json(result);
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

router.get('/work_by_id', (req, res) => {
  let workId = req.query.id;
  let workType = req.query.type;

  GalleryWork.find({ _id: workId })
    .populate('writer')
    .exec((err, workDetailInfo) => {
      if (err) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, workDetailInfo });
    });
});

module.exports = router;
