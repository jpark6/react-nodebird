import express from 'express';

const postRouter = express.Router();

postRouter.post('/', (req, res) => {
  res.json({ id: 1, content: 'hello' });
});

postRouter.delete('/', (req, res) => {
  res.json({ id: 1 });
});

export default postRouter;
