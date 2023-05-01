const { Router } = require('express');
const tesTer = require('../controller/loggerTest.controller');

const router = Router();

router.get('/', tesTer.get);

module.exports = router;
