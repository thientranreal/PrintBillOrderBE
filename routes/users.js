var express = require('express');
const { validateRequestSchema } = require('../middleware/validator-request-schema');
const { schemaLogin } = require('../schema/loginSchema');
var router = express.Router();

/* GET users listing. */
router.get('/', schemaLogin, validateRequestSchema, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
