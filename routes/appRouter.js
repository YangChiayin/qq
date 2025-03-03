const express = require("express");
const router = express.Router();

// Import validators, controllers
const { loginValidators, formValidators } = require("../middleware/validators");
const { getLogin, postLogin, getLogout } = require("../controllers/loginController");
const { getForm, postForm, getAll } = require("../controllers/formController");

// Define routes
router
    .get("/login", getLogin)
    .post("/login", loginValidators, postLogin)
    .get("/logout", getLogout)
    .get("/", getForm)
    .post("/", formValidators, postForm)
    .get("/all", getAll)
;

// Export the router
module.exports = router;
