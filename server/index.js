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

app.use('/api/work', require('./routes/work'));

// 5000포트 사용하여 app 시작
app.listen(5000, () => {
  console.log('app start at 5000 port');
});
