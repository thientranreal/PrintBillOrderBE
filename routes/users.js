var express = require('express');
const { validateRequestSchema } = require('../middleware/validator-request-schema');
const { schemaLogin, registerSchema } = require('../schema/loginSchema');
const { register, login, scrapeTikTok, logout, profile, updateProfile } = require('../controller/users.controller');
const { verifyAccount } = require('../lib/auth');
var router = express.Router();

/* GET users listing. */
router.post('/login', schemaLogin, validateRequestSchema, login);
router.post('/register', registerSchema, validateRequestSchema, register);
router.get('/tiktokLive', scrapeTikTok);
router.get('/profile', verifyAccount, profile);
router.put('/profile', verifyAccount, updateProfile);
router.get('/logout', logout);


module.exports = router;
