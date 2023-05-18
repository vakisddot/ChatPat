const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/db");
const setUpWebSocketServer = require("./websocket");
const apiRoutes = require("./routes/apiRoutes");

// Setting up .env
dotenv.config();
const serverPort = process.env.SERVER_PORT || "3001";
const wssPort = process.env.WSS_PORT || "3002";

// Setting up db
connectToDatabase();

// Setting up server
const app = express();
app.use(express.json());
app.listen(serverPort, console.log(`Server has started. Port: ${serverPort}`));

// Setting up wss
setUpWebSocketServer(wssPort);

// Routes
app.use("/api", apiRoutes);
