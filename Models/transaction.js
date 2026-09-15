const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        senderCustomer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },

        recipientCustomer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },

        senderAccount: {
            type: String,
            required: true
        },

        receiverAccount: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 1
        },

        reference: {
            type: String,
            required: true,
            unique: true
        },

        status: {
            type: String,
            required: true
        },

        transferType: {
            type: String,
            enum: ["intra-bank", "inter-bank"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;