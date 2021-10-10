const express = require('express');
const { isLoggedIn } = require('./middlewares');

const { Post, Comment, Image, User } = require('../models');

const postRouter = express.Router();

postRouter.post(
  '/',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id,
      });
      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [{
          model: Image,
        }, {
          model: Comment,
        }, {
          model: User,
        }]
      })
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

postRouter.post(
  '/:postId/comment',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId }
      });

      if(!post) {
        return res.status(403).send('존재하지 않는 게시글입니다.');
      }
      const comment = await Comment.create({
        content: req.body.content,
        PostId: req.params.postId,
        UserId: req.user.id,
      });
      res.status(201).json(comment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

postRouter.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = postRouter;
