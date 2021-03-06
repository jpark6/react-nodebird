const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const exUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if(exUser) {
    return res.status(403).send('email is already used.');
  }
  const { email, nickname, password } = req.body;
  console.log(email, nickname, password);
  const hashedPassword = await bcrypt.hash(req.body.password, 13);
  await User.create({
    email,
    nickname,
    password: hashedPassword
  });

  return res.status(201).send('user created');
})
router.get('/', async (req, res, next) => { // get /user/
  try {
    if(req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
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
      });
      return res.json(fullUserWithoutPassword);
    } else {

      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
   passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(err);
      return next(err);
    }

    if(info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if(loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [{
          model: Post
        }, {
          model: User,
          as: 'Followings'
        }, {
          model: User,
          as: 'Followers'
        }]
      });
      return res.json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id }
    });
    res.status(200).json({nickname: req.body.nickname});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;