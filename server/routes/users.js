const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// auth(middleware)
// TODO: auth 정의에서는 매개변수를 세 개 사용했는데??
router.get('/auth', auth, (req, res) => {
  // auth에서 인증로직 통과 후 다음의 코드 실행
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/login', (req, res) => {
  // 1. 요청된 이메일 주소를 DB에서 검색(User schema 내 이메일 중 요청 이메일 주소 검색)
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    // 요청한 이메일 주소가 없다면
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: '해당하는 이메일이 없습니다.',
      });
    }
    // 2. 요청한 이메일과 일치하는 user가 DB 내 있다면, user 비밀번호 일치여부 확인
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSueccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      // 3. 비밀번호 일치 시 토큰 생성
      userInfo.generateToken((err, userInfo) => {
        if (err) return res.status(400).send(err);
        // 쿠키에 token 저장
        return (
          res
            // client browser 쿠기에 token 저장
            .cookie('x_auth', userInfo.token)
            .status(200)
            .json({ loginSuccess: true, userId: userInfo._id, userToken: userInfo.token })
        );
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  // 로그아웃 해당 유저를 DB에서 검색 및 DB 내 해당 유저 token 공백 처리
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.post('/addToCart', auth, (req, res) => {
  // 1. User Collection에서 해당 유저의 정보 가져오기
  // 1-1. auth(middleware) 거치면서 req.user._id를 받아올 수 있음
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // 2. 가져온 정보에서 장바구니에 넣으려는 상품이 존재하는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.workId) {
        duplicate = true;
      }
    });
    // 2-1. 존재한다면
    if (duplicate) {
      User.findOneAndUpdate(
        // 특정 유저의 특정
        { _id: req.user._id, 'cart.id': req.body.workId },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(200).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
    // 2-2. 존재하지 않는다면
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.workId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

module.exports = router;
