const express = require('express');
const indexRouter = require('./routes/index.js');
const postRouter = require('./routes/post.js');
const db = require('./models');

const app = express();
const port = 4000;

db.sequelize.sync()
  .then(() => {
    console.log("Success DB Connect")
  }).catch((err) => {
    console.log(err);
  });

app.use('/', indexRouter);
app.use('/post', postRouter);

app.listen(port, () => {
  console.log(`NodeJs Server Listening on ${port}`);
});
