const usersModel = require("../models/users.model");
const crypto = require("crypto");

exports.postUserAuthenticate = (req, res) => {
    const psHash = crypto.createHash("sha256").update(req.body.password).digest("hex");    
    if ( usersModel.validPassword(psHash, req.body.username, usersModel.getUsers()) ) {
        res.locals.username = req.body.username;
        req.session.loggedin = true;
        req.session.username = res.locals.username;
        res.redirect("/dashboard");
    }
    else {
        res.sendStatus(401);
    }
};

exports.postUserNewAccount = (req, res, next) => {
    const psHash = crypto.createHash("sha256").update(req.body.password).digest("hex");    
    usersModel.addUser(req.body.username, {password: psHash})

    res.locals.username = req.body.username;
    req.session.loggedin = true;
    req.session.username = res.locals.username;
    res.redirect("/dashboard");
};