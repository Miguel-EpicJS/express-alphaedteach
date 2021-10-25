const messagesModel = require("../models/messages.model");

exports.getMessagesController = (req, res, next) => {
    const messages = messagesModel.getMessages();

    if (req.session.loggedin) {
        res.render("messages", {messages: messages});
    }else{
        res.redirect("/");
    } 
}

exports.postMessagesController = (req, res, next) => {
    const messages = messagesModel.getMessages();
    
    if (req.session.loggedin) {
        if (messages[req.session.username] === undefined) {
            messagesModel.addMessages(req.session.username, [req.body.message]);
        }else {
            messages[req.session.username].push(req.body.message);
            messagesModel.addMessages(req.session.username, messages[req.session.username]);
        };
        res.redirect("/dashboard");
    }else{
        res.redirect("/");
    } 
}