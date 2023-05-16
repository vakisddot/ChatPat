const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/db");
const User = require("./models/userModel");

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
const port = process.env.PORT || "3001";

app.listen(port, console.log(`Server has started. Port: ${port}`));

app.post("/api/new-user", (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => {
            console.log(`New user has been registered! Data: ${user}`);
        })
        .catch((err) => {
            console.log(`Failed to register user! Error: ${err.message}`);
        });
});
