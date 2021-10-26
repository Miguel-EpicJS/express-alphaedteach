const messagesModel = require("../models/messages.model");

exports.getMessagesController = (req, res, next) => {
    const messages = messagesModel.getMessages();

    res.render("messages", {messages: messages});
}

exports.postMessagesController = (req, res) => {
    const messages = messagesModel.getMessages();
    
    if (messages[res.locals.user] === undefined) {
        messagesModel.addMessages(res.locals.user, [req.body.message]);
    }else {
        messages[res.locals.user].push(req.body.message);
        messagesModel.addMessages(res.locals.user, messages[res.locals.user]);
    };
    res.redirect("/dashboard");
}