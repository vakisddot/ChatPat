const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const tempData = {
    name: "Ivaylo",
    age: 22,
    isCool: true,
};

app.listen(port, console.log(`Server has started. Port: ${port}`));

app.get("/api/temp", (req: any, res: any) => {
    res.send(tempData);
});
