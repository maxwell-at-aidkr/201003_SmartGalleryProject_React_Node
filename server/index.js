const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/User');

const mongoose = require('mongoose');
const connect = mongoose
  .connect('mongodb+srv://manjin:abcd1234@boilerplate.dq0kk.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// express server 생성
const app = express();
// json 형태 요청에 대해 파싱 가능
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).send('good');
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/api/users/login', (req, res) => {
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
        return res.cookie('x_auth', userInfo.token).status(200).json({ loginSuccess: true, userId: userInfo._id });
      });
    });
  });
});

app.use('/api/work', require('./routes/work'));

// 5000포트 사용하여 app 시작
app.listen(5000, () => {
  console.log('app start at 5000 port');
});
