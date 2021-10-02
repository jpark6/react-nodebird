const express = require('express');
const indexRouter = require('./routes/index.js');
const postRouter = require('./routes/post.js');
const userRouter = require('./routes/user.js');
const db = require('./models');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 4000;

db.sequelize.sync()
  .then(() => {
    console.log("Success DB Connected");
  }).catch(console.error);

passportConfig();

app.use(cors({
  origin: true,
  credentials: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* MiddleWares */
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));;
app.use(passport.initialize());
app.use(passport.session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`NodeJs Server Listening on ${port}`);
});
