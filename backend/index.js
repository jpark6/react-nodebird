import express from 'express';
import postRouter from './routes/post.js';

const app = express();

app.get('/', (req, res) => {
  res.send("hello express");
});

app.get('/api', (req, res) => {
  res.json({
    arr:[
      { id: 1, name: 'api' },
      { id: 2, name: 'kong'}
    ]
  })
});

app.use('/post', postRouter);

const callback = () => {
  console.log('Server started : 3065');
};

app.listen(3065, callback);
