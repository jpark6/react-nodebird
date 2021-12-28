const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const db = require('./models');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('DB Connect Success')
  })
  .catch(console.error);
passportConfig();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("hello express!");
});

app.get('/api', (req, res) => {
  res.json({
    arr:[
      { id: 1, name: 'api' },
      { id: 2, name: 'kong'}
    ]
  })
});

app.use('/post', postRouter);
app.use('/user', userRouter);

const callback = () => {
  console.log('Server started : 4000');
};

app.listen(4000, callback);
