const messagesController = require("../controllers/messages.controller");
const usersController = require("../controllers/users.controller");
const cookieController = require("../controllers/cookie.controller");
const qrcodeController = require("../controllers/qrcode.controller");

const usersModel = require("../models/users.model");

exports.appRoute = (router) => {
    
    router.get("/", (req, res) => {
        res.render("login", {});            
    });
    
    router.get("/dashboard", cookieController.validCookie, (req, res) => {
        res.render("dashboard", {username: res.locals.user, hash: usersModel.getUsers()[res.locals.user].password});
    });

    router.get("/logout", (req, res) => {
        res.clearCookie("session_id");
        res.redirect("/");
    });

    router.post("/authenticate", usersController.postUserAuthenticate)
    router.post("/new-account", usersController.postUserNewAccount);

    router.get("/login", usersController.getQrCodeLogin);

    router.get("/messages", cookieController.validCookie, messagesController.getMessagesController);
    router.post("/new-message", cookieController.validCookie, messagesController.postMessagesController);
    
    router.get("/qrcode", qrcodeController.createQrCodeToLocalhost, qrcodeController.renderQrCode );

    router.all("*", (req, res) => {
        res.status(404).json({ message: "Sorry this page doesn't exist" });
    });
};