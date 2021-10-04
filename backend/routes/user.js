const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const userRouter = express.Router();

/**
 * Login
 * post: /user/login
 */
userRouter.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, user, info) => {
      if(err) {
        console.error(err);
        next(err);
      }
      if(info) {
        return res.status(401).send(info);
      }
      return req.login(user, async (loginError) => {
        if(loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.status(201).json(user);
      });
    }
  )(req, res, next);
});

userRouter.post('/logout', (req, res, next) => {
  req.logout();
  req.session = null;

  res.send('ok');
})

/**
 * SignUp
 * post: /user
 */
userRouter.post('/', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      }
    });

    if(exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(201).send('회원가입이 완료되었습니다.');
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = userRouter;
