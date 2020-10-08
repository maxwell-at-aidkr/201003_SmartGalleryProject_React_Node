const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: 'uploads/' });

const { Work } = require('../models/Work');

router.post('/uploadfiles', upload.single('img'), (req, res) => {
  res.json(req.file);
  console.log(req.file);
});

router.get('/getWorks', (req, res) => {
  Work.find().exec((err, works) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, works });
  });
});

router.post('/uploadWork', (req, res) => {
  const work = new Work(req.body);

  work.save((err, work) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
