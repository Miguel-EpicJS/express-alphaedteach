const messagesController = require("../controllers/messages.controller");
const usersController = require("../controllers/users.controller");

exports.appRoute = (router) => {
    
    router.get("/", (req, res) => {
        if (req.session.loggedin) {
            res.redirect("/dashboard");
        }else
        {
            res.render("login", {});
        }
    });
    
    router.get("/dashboard", (req, res) => {
        if (req.session.loggedin) {
            res.render("dashboard", {username: req.session.username});
        }else{
            res.redirect("/");
        } 
    });
    

    router.get("/logout", (req, res) => {
        req.session.destroy((err) => { console.error(err) });
        res.redirect("/");
    });

    router.post("/authenticate", usersController.postUserAuthenticate)
    router.post("/new-account", usersController.postUserNewAccount);

    router.get("/messages", messagesController.getMessagesController);
    router.post("/new-message", messagesController.postMessagesController);
    
    router.get("*", (req, res) => {
        res.status(404).json({ message: "Sorry this page doesn't exist" });
    });
};