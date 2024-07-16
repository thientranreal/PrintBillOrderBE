const { validationResult } = require("express-validator")
// custome valid request 
module.exports.validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array(), message: "error validators", data: [] })
    }
    next()
}