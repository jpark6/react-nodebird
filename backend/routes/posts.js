const express = require('express');
const { Post, User, Image, Comment } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {};
    if(parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)};
    }
    const posts = await Post.findAll({
      where,
      limit: req.query.limit || 5,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: {
          model: User,
          attributes: ['id', 'nickname'],
        }
      }]
    });
    return res.status(200).json(posts);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;