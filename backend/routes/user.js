const express = require('express');
const db = require('../models');

const userRouter = express.Router();

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
      password: req.body.password,
    });

    res.status(201).send('ok');
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = userRouter;
