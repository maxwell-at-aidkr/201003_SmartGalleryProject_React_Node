const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

// 노드 서버 내 이미지 경로에 대해 클라이언트에서 접근
// https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

app.use('/api/user', require('./routes/user'));
app.use('/api/work', require('./routes/work'));

const port = 5000;
app.listen(port, () => {
  console.log('app start');
});
