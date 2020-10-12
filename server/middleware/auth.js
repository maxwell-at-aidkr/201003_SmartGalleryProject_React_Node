const { User } = require('../models/User');

// 인증처리 로직
let auth = (req, res, next) => {
  // 1. 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;

  // 2. 토큰을 복호화하고 유저 찾기
  User.findByToken(token, (err, user) => {
    // 3. DB 내 유저 있으면 인증 OK, 없으면 인증 NO
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // auth를 호출한 함수에서 token과 user 정보를 불러올 수 있음
    req.token = token;
    req.user = user;

    // next 사용 이유: middleware 탈출(미사용 시 메인코드에서 계속 auth에 갇힘)
    next();
  });
};

module.exports = { auth };
