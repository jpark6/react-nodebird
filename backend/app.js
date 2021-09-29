const express = require('express');
const postRouter = require('./routes/post');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/post', postRouter);

app.listen(port, () => {
  console.log(`NodeJs Server Listening on ${port}`);
});
