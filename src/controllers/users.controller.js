const usersModel = require("../models/users.model");
const crypto = require("crypto");

exports.postUserAuthenticate = (req, res) => {
    const psHash = crypto.createHash("sha256").update(req.body.password).digest("hex");    
    if ( usersModel.validPassword(psHash, req.body.username, usersModel.getUsers()) ) {
        res.cookie("session_id", req.body.username + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");
    }
    else {
        res.sendStatus(401);
    }
};

exports.postUserNewAccount = (req, res) => {
    const psHash = crypto.createHash("sha256").update(req.body.password).digest("hex");    
    usersModel.addUser(req.body.username, {password: psHash})

    res.cookie("session_id", req.body.username + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");
};