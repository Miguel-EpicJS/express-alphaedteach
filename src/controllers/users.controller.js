const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");

exports.postUserAuthenticate = (req, res) => {
    if ( bcrypt.compareSync(req.body.password, usersModel.getUsers()[req.body.username].password) ) {
        res.cookie("session_id", req.body.username + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");
    }
    else {
        res.sendStatus(401);
    }
};

exports.postUserNewAccount = (req, res) => {
    const psHash = bcrypt.hashSync(req.body.password, 10);   
    usersModel.addUser(req.body.username, {password: psHash})

    res.cookie("session_id", req.body.username + "." + new Date().getTime(), {signed: true}).redirect("/dashboard");
};