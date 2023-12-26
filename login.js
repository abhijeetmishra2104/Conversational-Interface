import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res) => {
    res.render("login.ejs");
})

app.post("/login",(req,res) => {
    const username= req.body["username"];
    const password = req.body["password"];
    if (username=="admin" && password == "123"){
        res.render("homePage.ejs");
    }
})
app.listen(port,()=>{
    console.log("server is running on the port 3000");
})