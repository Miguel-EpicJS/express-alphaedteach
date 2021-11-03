const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");

exports.postUserAuthenticate = (req, res) => {
    try {
        if ( bcrypt.compare(req.body.password, usersModel.getUsers()[req.body.username].password) ) {
            res.cookie("session_id", req.body.username + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");
        }
        else {
            res.status(401).send("Your password or username is wrong");
        }    
    } catch (error) {
        res.sendStatus(500);
    }
    
};

exports.postUserNewAccount = (req, res) => {
    try {
        bcrypt.genSalt(13).then(salt => {
            bcrypt.hash(req.body.password, salt).then(hash => {
                console.log(usersModel.getUsers());
                if (usersModel.getUsers()[req.body.username] === undefined) {
                    usersModel.addUser(req.body.username, {password: hash})
        
                    res.cookie("session_id", req.body.username + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");                        
                }else{
                    res.status(403).send("Use a different username");
                }
    
            });    
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }    
};

exports.getUserDashboard = (req, res) => {
    res.render("dashboard", {username: res.locals.user, hash: usersModel.getUsers()[res.locals.user].password});
};

exports.userLogout = (req, res) => {
    res.clearCookie("session_id");
    res.redirect("/");
};

exports.getQrCodeLogin = (req, res) => {
    const token = (req.query.token).split(".");
    try {
        if ( bcrypt.compare(token[1], usersModel.getUsers()[token[0]].password) ) {
            res.cookie("session_id", token[0] + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");
        }
        else {
            res.status(401).send("Your password or username is wrong");
        }    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}