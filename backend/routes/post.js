import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    res.json({
        id: 1,
        name: 'asdfasdf'
    });
});

router.delete('/', (req, res) => {
    res.json({
        id: 1
    });
});

export default router;