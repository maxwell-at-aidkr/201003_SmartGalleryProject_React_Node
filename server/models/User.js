const mongoose = require('mongoose');
// const bcrypt = require("bcryptjs");
// const saltRounds = 10;
// const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // space 제거
    trim: true,
    // unique filed 지정
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // 일반 사용자(0), 관리자(1) 구분
  role: {
    type: Number,
    // 기본값으로 일반 사용자 지정
    default: 0,
  },
  //
  image: String,
  //
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
