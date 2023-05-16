const { Router } = require('express');
const userModel = require('../dao/models/users.model');
const viewSession = require('../controller/sessions.controller');
const passport = require('passport');
const { REGISTER_STRATEGY, LOGIN_STRATEGY } = require('../utils/constants');
const adminPermission = require('../middlewares/isAdmin');
const { getPayload } = require('../utils/jwt');

const router = Router();

router.post('/register', passport.authenticate(REGISTER_STRATEGY), viewSession.sessionLogin);

router.post('/login', passport.authenticate(LOGIN_STRATEGY), viewSession.loginRegister);

router.post('/forgot-password', viewSession.forgotPassword);

router.post('/forgotpassword', getPayload, viewSession.RecoverPassword);

router.get('/current', adminPermission, viewSession.current);

module.exports = router;
