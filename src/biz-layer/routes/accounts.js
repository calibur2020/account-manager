const { Router } = require('express');
const { asyncMiddleware } = require('../middleware');
const Account = require('../controllers/accounts');
const router = new Router();

router.get('/:accountNumber/balance', asyncMiddleware(Account.getBalance));
router.post('/transfer', asyncMiddleware(Account.transfer));

module.exports = router;
