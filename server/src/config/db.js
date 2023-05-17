const mongoose = require("mongoose");

const connectToDatabase = async () => {
    const connection = await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        })
        .then((res) => {
            console.log(`Connected to MongoDB! ${res}`);
        })
        .catch((err) => {
            console.log(`Failed to connect to MongoDB! ${err.message}`);
        });
};

module.exports = connectToDatabase;
