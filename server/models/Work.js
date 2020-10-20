const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = mongoose.Schema(
  {
    // 게시글 작성자
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // 작가 이름
    author: {
      type: String,
    },
    // 작품 이름
    title: {
      type: String,
      maxlength: 50,
    },
    // 작품 설명
    description: {
      type: String,
    },
    // 작품 이미지
    WorkImages: {
      type: Array,
      default: [],
    },
    // 작가 이미지
    AuthorImage: {
      type: Array,
      default: [],
    },
    // 작품 가격
    price: {
      type: Number,
      default: 0,
    },
    // 판매 수량
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    // 게시글 조회수
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Work = mongoose.model('Work', workSchema);

module.exports = { Work };
