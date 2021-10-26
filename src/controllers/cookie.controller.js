exports.validCookie = (req, res, next) => {
    if ("session_id" in req.signedCookies) {
        const splitCookie = req.signedCookies["session_id"].split(".");
        res.locals.user = splitCookie[0];
        res.locals.time = splitCookie[1];
        next();
    } else {
        res.locals.login = true;
        res.redirect("/");
    }
}