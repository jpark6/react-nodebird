const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const { User, Post } = require('../models');
const  { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const userRouter = express.Router();

/**
 * Login
 * post: /user/login
 */
userRouter.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

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
