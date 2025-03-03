const { body, check, oneOf } = require("express-validator");
const { Login } = require("../models/loginModel");

// TODO: Add Login validators
const loginValidators = [
    check("username").notEmpty().withMessage("Please enter your username"),
    check("password").notEmpty().withMessage("Please enter your password"),
    body("username").custom(async (username, { req }) => {
        let password = req.body.password;

        let user = await Login.findOne({ username, password }).exec();

        if (!user) {
            throw new Error("Invalid credentials")
        }

    })
];

// TODO: Add Form validators
const formValidators = [
    check("userName").notEmpty().withMessage("Please enter your name"),
    check("userPhone").matches(/^\d{3}-\d{3}-\d{4}$/).withMessage("Please enter a valid phone number"),
    check("mangoJuicesQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Mango Juices quantity should be a positive number"),
    check("berryJuicesQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Berry Juices quantity should be a positive number"),
    check("appleJuicesQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Apple Juices quantity should be a positive number"),
    oneOf([
        check("mangoJuicesQuantity").notEmpty(),
        check("berryJuicesQuantity").notEmpty(),
        check("appleJuicesQuantity").notEmpty(),
    ], { message: "Please purchase at lease one product" })
];
;

module.exports = {
    loginValidators,
    formValidators
};
