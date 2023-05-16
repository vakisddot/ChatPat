const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/db");

dotenv.config();
connectToDatabase();

const app = express();
const port: string = process.env.PORT || "3001";

const tempData = {
    name: "Adnan Beats",
    age: 24,
    isCool: true,
};

app.listen(port, console.log(`Server has started. Port: ${port}`));

app.get("/api/temp", (req: any, res: any) => {
    res.send(tempData);
});
