const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/db");
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const WebSocket = require("ws");

// Setting up .env & db
dotenv.config();
connectToDatabase();

// Setting up server
const app = express();
app.use(express.json());
const port = process.env.PORT || "3001";
app.listen(port, console.log(`Server has started. Port: ${port}`));

// Setting up wss
const wsp = "3002";
const wss = new WebSocket.Server({ port: wsp });

// Routes
app.post("/api/new-user", (req, res) => {
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

app.get("/api/all-messages", (req, res) => {
    Message.find()
        .populate("sentBy")
        .then((messages) => {
            res.send(messages);
        });
});

wss.on("connection", (ws) => {
    console.log(`[WSS] New connection established.`);

    ws.on("message", (data) => {
        const parsedMessage = JSON.parse(data);
        const nickname = parsedMessage.sentBy.nickname;

        User.findOne({ nickname }).then((user) => {
            const newMessage = new Message({
                message: parsedMessage.message,
                sentBy: user._id, // Use the user's ObjectId
            });

            // We register the new message in the db
            newMessage
                .save()
                .then(() => {
                    console.log(
                        `[MongoDB] New message has been registered! Data: ${newMessage}`
                    );

                    // And we send it back to all connected clients
                    const msgToSend = JSON.stringify(parsedMessage);

                    wss.clients.forEach((client) => {
                        if (
                            client !== ws &&
                            client.readyState === WebSocket.OPEN
                        ) {
                            client.send(msgToSend);
                        }
                    });
                })
                .catch((err) => {
                    console.log(
                        `[MongoDB] Failed to register message! Error: ${err.message}`
                    );
                });
        });
    });

    ws.on("close", () => {
        console.log("[WSS] Client has disconnected.");
    });
});
