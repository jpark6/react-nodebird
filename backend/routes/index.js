const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('Hello Express!');
});

module.exports = indexRouter;
