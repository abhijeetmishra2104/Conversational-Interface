const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const jwtPassword = "Code_Soc";

const app = express();
const port = 3000;
// Connect to MongoDB database using Mongoose.
async function main() {
    await mongoose.connect("mongodb+srv://abhijeetmishra2104:Abhijeetmis%402104@cluster0.pnpjyu0.mongodb.net/");
}
const user = mongoose.model('Users', {
    Name: String,
    username: String,
    password: String
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.post("/signup", async function (req, res) {
    res.render("signup.ejs");
    const username = req.body.username;
    const Name = req.body.Name;
    const password = req.body.password;
    const userExists = await user.findOne({
        username: username
    })
    if (userExists) {
        return res.send("User name already exists");
    }
    const newUser = new user({
        Name: Name,
        username: username,
        password: password
    });
    newUser.save();
    res.json("User created successfully");
    const value = {
        Name: Name,
        username: username,
        password: password
    }
    const token = jwt.sign(value, jwtPassword);
});

app.post("/login", (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    if (username == "admin" && password == "123") {
        res.render("homePage.ejs");
    }
});

app.listen(port, () => {
    console.log("server is running on port 3000");
});
