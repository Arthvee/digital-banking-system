const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        dob: {
            type: String,
            required: true
        },

        phone: {
            type: String
        },

        kycType: {
            type: String,
            enum: ["bvn", "nin"],
            required: true
        },

        kycID: {
            type: String,
            required: true
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;