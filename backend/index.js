const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('DB Connect Success')
  })
  .catch(console.error);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("hello express!");
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
app.use('/user', userRouter);

const callback = () => {
  console.log('Server started : 4000');
};

app.listen(4000, callback);
