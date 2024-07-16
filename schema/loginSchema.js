const { body } = require('express-validator');
// schema login validator
module.exports.schemaLogin = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 5 }).withMessage('Password is not empty')
]

module.exports.registerSchema = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
        .exists({ checkFalsy: true }).withMessage('You must type a password'),
    body('confirmedPassword')
        .exists({ checkFalsy: true }).withMessage('You must type a confirmation password')
        .custom((value, { req }) => value === req.body.password).withMessage("The passwords do not match")


]
