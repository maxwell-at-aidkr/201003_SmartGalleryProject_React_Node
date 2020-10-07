const express = require('express');
const router = express.Router();

const { Video } = require('../models/Video');

router.get('/getVideos', (req, res) => {
  Video.find().exec((err, videos) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, videos });
  });
});

module.exports = router;
