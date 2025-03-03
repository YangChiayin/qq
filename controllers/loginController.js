const { validationResult } = require("express-validator");

const getLogin = (req, res) => {
    if (!req.session.userLoggedIn) {
        res.render("pages/login");
    } else {
        res.redirect("/")
    }
};

const postLogin = (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.username = "";
        req.session.userLoggedIn = false;
        res.render("pages/login", { errors: errors.array() });
    } else {
        req.session.username = req.body.username;
        req.session.userLoggedIn = true;
        res.redirect("/")
    }
};

const getLogout = (req, res) => {
    req.session.username = "";
    req.session.userLoggedIn = false;
    res.redirect("/login");
};

module.exports = {
    getLogin,
    postLogin,
    getLogout
};
