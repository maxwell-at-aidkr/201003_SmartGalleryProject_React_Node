const express = require('express');
const router = express.Router();
const { GalleryWork } = require('../models/GalleryWork');

const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');

//=================================
//             Work
//=================================

// 로컬 서버 스토리지에 이미지 파일 저장 로직(multer 모듈 활용)
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// let upload = multer({ storage: storage });

// AWS S3에 이미지 파일 저장하는 로직(multer-s3 활용)
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'secondsmartgallerystorage',
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    acl: 'public-read-write',
  }),
});

router.post('/image', upload.single('file'), function (req, res, next) {
  let file = req.file;
  let AWSfilePath = `https://smartgallerystorage.s3.ap-northeast-2.amazonaws.com/${file.key}`;

  let result = {
    success: true,
    filePath: AWSfilePath,
    fileName: file.key,
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

// DB 내 모든 Works에 대해 response
router.post('/getWorks', (req, res) => {
  GalleryWork.find().exec((err, workInfo) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, workInfo });
  });
});

// work id를 조건으로 해당되는 Work에 대해 response
router.get('/works_by_id', (req, res) => {
  let workIds = req.query.id;
  let workType = req.query.type;

  if (workType === 'array') {
    let ids = req.query.id.split(',');
    workIds = ids.map((id) => {
      return id;
    });
  }
  GalleryWork.find({ _id: { $in: workIds } })
    .populate('writer')
    .exec((err, workDetailInfo) => {
      if (err) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, workDetailInfo });
    });
});

module.exports = router;
