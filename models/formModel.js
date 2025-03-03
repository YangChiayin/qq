const { Schema, model } = require("mongoose");

// TODO: Create a schema
const formSchema = new Schema({
    userName: { type: String },
    userPhone: { type: String },
    products: { type: Array },
    
    // Since we use array "products" we do not need to list product detail one by one

    // mangoJuicesQuantity: { type: Number, default: 0 },
    // berryJuicesQuantity: { type: Number, default: 0 },
    // appleJuicesQuantity: { type: Number, default: 0 },
    // mangoJuicesLineTotal: { type: Number, default: 0 },
    // berryJuicesLineTotal: { type: Number, default: 0 },
    // appleJuicesLineTotal: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0.13 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
});

// Create a model
const FormModel = model("entries", formSchema);

// Export the model
module.exports = {
    FormModel
};
