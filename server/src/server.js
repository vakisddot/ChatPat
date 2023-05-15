"use strict";
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server has started. Port: ${port}`));
app.get("/", (req, res) => {
    res.send("Hello world!");
});
