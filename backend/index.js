const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('DB Connect Success')
  })
  .catch(console.error);

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
