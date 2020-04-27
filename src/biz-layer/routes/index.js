const { Router } = require('express');

const router = Router();

router.use('/ping', require('./ping'));
router.use('/accounts/', require('./accounts'));

module.exports = router;
