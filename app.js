const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3001;


const bootstrap = require("./src/bootstrap");

app.use(express.static(path.join(__dirname, 'src/public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({secret:"Keep it secret", name:"uniqueSessionID", saveUninitialized:false, resave: true}))

app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'src/views'));

bootstrap(app);

app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});