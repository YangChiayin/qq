// Import packages
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");

const appRouter = require("./routes/appRouter");

// Connect to database
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri)
    .then(() => { console.log(`Connected to database!`); })
    .catch((error) => { console.log(error.message); });

// Create an app
const app = express();
const port = 3000;

// Set up session, static folder, body parser, view engine
app.use(session({
    secret: "24S-PROG1935-S3-FINAL",
    saveUninitialized: true,
    resave: false
}));
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

// Router
app.use("/", appRouter);

// Run the app
app.listen(port, () => {
    console.log(`App http://localhost:${port}`);
});
