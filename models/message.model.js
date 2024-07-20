const mongoose = require('mongoose');
const schemaMessage = new mongoose.Schema({
    user_id: {
        type: String
    },
    nickname: {
        type: String
    },
    message: {
        type: String
    },
    avatar: {
        type: String
    },
    userId: {
        type: String
    }
})
const MessageModel = mongoose.model('Message', schemaMessage)
module.exports = MessageModel;