const { validationResult } = require("express-validator");
const { FormModel } = require("../models/formModel");

const mangoJuicesPrice = 2.99;
const berryJuicesPrice = 1.99;
const appleJuicesPrice = 2.49;

const getForm = (req, res) => {
    res.render("pages/form", { mangoJuicesPrice, berryJuicesPrice, appleJuicesPrice });
};

const postForm = (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render("pages/form", {
            errors: errors.array(),
            userName: req.body.userName,
            userPhone: req.body.userPhone,
            mangoJuicesQuantity: req.body.mangoJuicesQuantity,
            berryJuicesQuantity: req.body.berryJuicesQuantity,
            appleJuicesQuantity: req.body.appleJuicesQuantity,
            mangoJuicesPrice,
            berryJuicesPrice,
            appleJuicesPrice
        });
    } else {
        let subtotal = 0;
        let taxRate = 0.13;
        let tax = 0;
        let total = 0;

        let userName = req.body.userName;
        let userPhone = req.body.userPhone;
        let mangoJuicesQuantity = parseInt(req.body.mangoJuicesQuantity) || 0;
        let berryJuicesQuantity = parseInt(req.body.berryJuicesQuantity) || 0;
        let appleJuicesQuantity = parseInt(req.body.appleJuicesQuantity) || 0;

        let mangoJuicesLineTotal = mangoJuicesQuantity * mangoJuicesPrice;
        let berryJuicesLineTotal = berryJuicesQuantity * berryJuicesPrice;
        let appleJuicesLineTotal = appleJuicesQuantity * appleJuicesPrice;

        subtotal = mangoJuicesLineTotal + berryJuicesLineTotal + appleJuicesLineTotal;
        tax = subtotal * taxRate;
        total = subtotal + tax;

        let data = {
            userName,
            userPhone,
            mangoJuicesPrice,
            berryJuicesPrice,
            appleJuicesPrice,

            products: [
                { name: "Mango Juice", price: mangoJuicesPrice, quantity: mangoJuicesQuantity, lineTotal: mangoJuicesLineTotal },
                { name: "Berry Juice", price: berryJuicesPrice, quantity: berryJuicesQuantity, lineTotal: berryJuicesLineTotal },
                { name: "Apple Juice", price: appleJuicesPrice, quantity: appleJuicesQuantity, lineTotal: appleJuicesLineTotal },
            ],

            // Since we use array "products" we do not need to list product detail one by one

            // mangoJuicesQuantity,
            // berryJuicesQuantity,
            // appleJuicesQuantity,
            
            // mangoJuicesLineTotal,
            // berryJuicesLineTotal,
            // appleJuicesLineTotal,

            subtotal,
            taxRate,
            tax,
            total
        };

        let newOrder = new FormModel(data);

        newOrder.save()
            .then(() => { console.log(`${userName}'s Order Saved'!`) })
            .catch((error) => { console.log(error.message); });

        res.render("pages/success", data);
    };
}

const getAll = async (req, res) => {
    if (req.session.userLoggedIn) {
        let all = await FormModel.find({}).exec();
        res.render("pages/all", { all });
    } else {
        res.redirect("/login")
    }
};

module.exports = {
    getForm,
    postForm,
    getAll
};
