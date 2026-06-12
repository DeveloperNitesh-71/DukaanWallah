const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        // Silently fail connection or handle appropriately without console logs
    }
};

module.exports = connectDB;
