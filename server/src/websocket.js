const WebSocket = require("ws");
const dotenv = require("dotenv");
const User = require("./models/userModel");
const Message = require("./models/messageModel");

const setUpWebSocketServer = (wssPort) => {
    const wss = new WebSocket.Server({ port: wssPort });

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
                            if (client.readyState === WebSocket.OPEN) {
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

    console.log(`Finished setting up WSS! Port: ${wssPort}`);
};

module.exports = setUpWebSocketServer;
