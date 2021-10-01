const express = require('express');
const indexRouter = require('./routes/index.js');
const postRouter = require('./routes/post.js');
const userRouter = require('./routes/user.js');
const db = require('./models');

const app = express();
const port = 4000;

db.sequelize.sync()
  .then(() => {
    console.log("Success DB Connected");
  }).catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`NodeJs Server Listening on ${port}`);
});
