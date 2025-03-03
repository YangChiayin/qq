const { Schema, model } = require("mongoose");

// TODO: Create a schema
const loginSchema = new Schema({
    "username": { type: String, unique: true },
    "password": { type: String }
});

// Create a model
const Login = model("admins", loginSchema);

// Export the model
module.exports = {
    Login
};
