const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DATABASE CONNECTED....');
    } catch (error) {
        console.log('DATABASE CONNECTED FAILED...', error);
    }
}
module.exports = connectDB;