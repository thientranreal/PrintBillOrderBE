const mongoose = require('mongoose');
const schemaUser = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
})
const UserModel = mongoose.model('Users', schemaUser)
module.exports = UserModel;