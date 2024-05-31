const mongoose = require("mongoose");
const ContactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const ContactUsModel = mongoose.model(
    "ContactUs",
    ContactUsSchema
);

module.exports = ContactUsModel;
