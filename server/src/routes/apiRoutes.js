const express = require("express");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

const router = express.Router();

router.post("/new-user", (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            console.log(
                `[MongoDB] New user has been registered! Data: ${user}`
            );
        })
        .catch((err) => {
            console.log(
                `[MongoDB] Failed to register user! Error: ${err.message}`
            );
        });
});

router.get("/all-messages", (req, res) => {
    Message.find()
        .populate("sentBy")
        .then((messages) => {
            res.send(messages);
        });
});

module.exports = router;
