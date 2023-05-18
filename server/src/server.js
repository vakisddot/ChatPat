const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./db");
const setUpWebSocketServer = require("./websocket");
const apiRoutes = require("./routes/apiRoutes");
const config = require("./config");

// Setting up .env
dotenv.config();
const serverPort = config.serverPort || "3001";
const wssPort = config.wssPort || "3002";

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
