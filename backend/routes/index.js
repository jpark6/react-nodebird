import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('Hello Express!');
});

export default indexRouter;
