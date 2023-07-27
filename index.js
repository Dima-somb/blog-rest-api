const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
// const multer = require("multer");
const bodyParser = require("body-parser");
// const path = require('path');

var router = express.Router();

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

app.use(bodyParser.urlencoded(
    { extended:true }
))

app.set("view engine","ejs");


app.get("/",(req,res)=>{
    res.render("index", { title: 'Just' });
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("6000", () => {
    console.log("Backend is running.");
})
