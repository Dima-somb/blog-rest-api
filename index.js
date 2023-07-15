const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const cors = require("cors")

app.use(
    cors({
        origin: "*"
    })
)


dotenv.config();
app.use(express.json());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(console.log("Connected to Mongo DB"))
    .catch((err) => console.log('err', err));

app.use("/api/auth", authRoute);

app.listen("5000", () => {
    console.log("Backend is running.");
})