const mongoose = require('mongoose');
const schemaUser = new mongoose.Schema({
    username: {
        type: String
    },
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
    },
    bankCode: {
        type: String
    },
    bankName: {
        type: String
    },
    shopName: {
        type: String
    },
    shopId: {
        type: String
    },
    tiktokUsername: {
        type: String
    }
})
const UserModel = mongoose.model('Users', schemaUser)
module.exports = UserModel;