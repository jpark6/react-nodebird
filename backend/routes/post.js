const express = require('express');

const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
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
    return res.status(201).json(fullPost);
  } catch(error) {
    console.log(error);
    next(error);
  };
});

router.post('/:postId/comment', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });

    if(!post) {
      return res.status(403).send('post is not exist');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.poseId,
      UserId: req.user.id,
    });
    return res.status(201).json(comment);
  } catch(error) {
    console.log(error);
    next(error);
  };
});

router.delete('/', (req, res) => {
  res.json({
    id: 1
  });
});

module.exports = router;