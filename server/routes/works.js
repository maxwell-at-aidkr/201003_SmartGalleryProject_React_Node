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
  accessKeyId: 'AKIAI5NRYPASNE5SD3FA', //노출주의
  secretAccessKey: 'vZQFyRoY0Awnn9mSUDkXmeWSEjG/PkxaAExv+0n6', //노출주의
  region: 'ap-northeast-2', //노출주의
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smartgallerystorage',
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
