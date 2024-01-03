const express = require("express");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const z = require("zod");
const jwtPassword = "Code_Soc";

const app = express();
const port = 4000;
const nameSchema = z.string();
const usernameSchema = z.string().email({message: "Invalid email address"});
const passwordSchema = z.string().min(5, { message: "Must be 8 or more characters long" });;


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
    else{
        res.send("bsdk");
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
