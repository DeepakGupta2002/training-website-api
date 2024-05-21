const mongoose = require("../../config/db");

const registrationSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
});

const registrationModal = mongoose.model("registration_", registrationSchema);

module.exports = {
    registrationModal
}
