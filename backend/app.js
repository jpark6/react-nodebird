import express from 'express';
import indexRouter from './routes/index.js';
import postRouter from './routes/post.js';

const app = express();
const port = 4000;

app.use('/', indexRouter);
app.use('/post', postRouter);

app.listen(port, () => {
  console.log(`NodeJs Server Listening on ${port}`);
});
