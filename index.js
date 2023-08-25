const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const bodyParser = require("body-parser");
const Image = require("./models/Image");
const multer = require('multer');
const path = require('path');

var router = express.Router();

app.use(
    cors({
        origin: "*"
    })
)

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

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

// Configure body-parser to parse JSON data
app.use(bodyParser.json());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: './images/',
    filename: function (req, file, cb) {
        cb(null, path.parse(file.originalname).name + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

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

