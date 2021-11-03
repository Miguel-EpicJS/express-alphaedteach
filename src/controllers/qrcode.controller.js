const qrcode = require("qrcode");

exports.createQrCodeToLocalhost = (req, res, next) => {
    qrcode.toDataURL(`http://127.0.0.1:3000/login?token=${req.query.info}`, (err, url) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }else{
            console.log(req.query.info);
            res.locals.imageUrl = url;
            next();
        }
    });
};

exports.renderQrCode = (req, res) => {
    res.render("cookie", {cookieUrl: res.locals.imageUrl});
};