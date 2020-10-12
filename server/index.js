const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

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

app.use(cookieParser());

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

// auth(middleware)
// TODO: auth 정의에서는 매개변수를 세 개 사용했는데??
app.get('/api/users/auth', auth, (req, res) => {
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

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.use('/api/work', require('./routes/work'));

const port = 5000;
app.listen(port, () => {
  console.log('app start');
});
