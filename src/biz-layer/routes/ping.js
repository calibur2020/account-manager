const { Router } = require('express');
const router = Router();

const pong = (req, res) => {
  res.json({ pong: 'pong' });
};

router.get('/', pong);
module.exports = router;
