const mongoose = require("mongoose");

const connectToDatabase = async () => {
    const connection = await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        })
        .then(() => {
            console.log("Connected to MongoDB!");
        })
        .catch((err) => {
            console.log(`Failed to connect to MongoDB! ${err.message}`);
            process.exit(1);
        });
};

module.exports = connectToDatabase;
