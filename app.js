function validToken(tk, obj)
{
    for(const p in obj){
        if (tk === obj[p].token) {
            return true;
        };
    };
    return false;
};
function validPassword(ps, us, obj)
{
    return obj[us].password === ps;
};

const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const path = require("path");

const app = express();
const port = 3001;

const users = {};
app.use(express.static(path.join(__dirname, 'src/public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({secret:"Keep it secret", name:"uniqueSessionID", saveUninitialized:false, resave: true}))

app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'src/views'));

app.get("/", (req, res) => {
    if (req.session.loggedin) {
        res.redirect("/dashboard");
    }else
    {
        res.render("login", {});
    }
});

app.post("/authenticate", (req, res, next) => {
    const psHash = crypto.createHash("sha256").update(req.body.password).digest("hex");    
    if ( validPassword(psHash, req.body.username, users) ) {
        res.locals.username = req.body.username;
        next();
    }
    else {
        res.sendStatus(401);
    }
}, (req, res) => {
    req.session.loggedin = true;
    req.session.username = res.locals.username;
    res.redirect("/dashboard");
})

app.post("/new-account", (req, res, next) => {
    const psHash = crypto.createHash("sha256").update(req.body.password).digest("hex");    
    users[req.body.username] = {password: psHash};

    res.locals.username = req.body.username;
    next();
}, (req, res) => {
    req.session.loggedin = true;
    req.session.username = res.locals.username;
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
    if (req.session.loggedin) {
        res.render("dashboard", {username: req.session.username});
    }else{
        res.redirect("/");
    } 
});

app.get('/logout',(req,res)=>
{
    req.session.destroy((err)=>{console.error(err)});
    res.redirect("/");
});

app.get("*", (req, res) => {
    res.status(404).json({message: "Sorry this page doesn't exist"});
});



app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});