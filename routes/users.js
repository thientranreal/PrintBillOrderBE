var express = require('express');
const { validateRequestSchema } = require('../middleware/validator-request-schema');
const { schemaLogin, registerSchema } = require('../schema/loginSchema');
const { register, login } = require('../controller/users.controller');
var router = express.Router();

/* GET users listing. */
router.post('/login', schemaLogin, validateRequestSchema, login);
router.post('/register', registerSchema, validateRequestSchema, register)

module.exports = router;
