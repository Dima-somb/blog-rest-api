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
const Image = require("./models/Image");

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

app.use(bodyParser.json())

app.set("view engine","ejs");


app.get("/",(req,res)=>{
    res.render("index", { title: 'Just' });
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
//
// app.listen("6000", () => {
//     console.log("Backend is running.");
// })

const multer = require('multer');
const path = require('path');

// Configure body-parser to parse JSON data
app.use(bodyParser.json());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST endpoint to handle incoming data
app.post('/api/posts', upload.single('image'), (req, res) => {
    const { text, date } = req.body;
    const image = req.file ? req.file.filename : null;

    // You can now use the 'text', 'date', and 'image' variables to process the data
    // For now, let's just send back a response with the received data
    res.json({ text, date, image });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

