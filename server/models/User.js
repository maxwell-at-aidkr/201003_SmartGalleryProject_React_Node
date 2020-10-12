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
  // 사용자에 의해 입력된 비밀번호와 DB 내 비밀번호 간 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  // user_id를 기반으로 jsonwebtoken 활용하여 signed token 생성
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  let user = this;

  // 토큰 decode
  jwt.verify(token, 'secretToken', function (err, decoded) {
    // _id와 관련 token으로 유저 찾기(token을 복호화하여 _id 추출)
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
