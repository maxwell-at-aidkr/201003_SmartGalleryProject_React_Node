const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

// pre 메소드 활용하여 DB save 전에 아래 로직 실행
userSchema.pre('save', function (next) {
  let user = this;
  // user 스키마 내  password filed의 생성, 수정 시에만 아래 로직 실행
  if (user.isModified('password')) {
    // plain password를 해쉬처리하고 salt를 섞어서 user.password에 저장
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // save 메소드로 이동(next())
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
