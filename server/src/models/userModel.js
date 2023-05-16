const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
