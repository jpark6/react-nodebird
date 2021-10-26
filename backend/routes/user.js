const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  try {
    if(req.user) {
      const user = await User.findOne({
        where: { id: req.user.id }
      });

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        },{
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },{
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
})

/**
 * Login
 * post: /user/login
 */
userRouter.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, user, info) => {
      if(err) {
        console.error(err);
        return next(err);
      }
      if(info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginError) => {
        if(loginError) {
          console.error(loginError);
          return next(loginError);
        }

        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password']
          },
          include: [{
            model: Post,
            attributes: ['id'],
          },{
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },{
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }]
        });
        return res.status(201).json(fullUserWithoutPassword);
      });
    }
  )(req, res, next);
});

userRouter.post('/logout', isLoggedIn,(req, res, next) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send('Logout Success');
  });
})

/**
 * SignUp
 * post: /user
 */
userRouter.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
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
