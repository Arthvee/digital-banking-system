const { accNibssHandler } = require("../Services/acc-nibss-handling");

const Customer = require("../Models/customer");
const Account = require("../Models/account");

exports.createAccount = async (req, res) => {
    try {
        const { kycType, kycID, dob } = req.body;

        const customer = await Customer.findOne({
            kycType,
            kycID
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }


       if (!customer._id.equals(req.user._id)) {
    return res.status(403).json({
        message: "You are not authorized to create an account for this customer"
    });
} 
        if (!customer.isVerified) {
            return res.status(403).json({
                message: "Customer must be verified before account creation"
            });
        }

        if (customer.dob !== dob) {
            return res.status(400).json({
                message: "Date of birth does not match customer record"
            });
        }

        const existingAccount = await Account.findOne({
            customer: customer._id
        });

        if (existingAccount) {
            return res.status(409).json({
                message: "Customer already has an account"
            });
        }

        const result = await accNibssHandler(req.body);

        const nibssAccount = result.account;

        const account = await Account.create({
            customer: customer._id,
            accountNumber: nibssAccount.accountNumber,
            accountName: nibssAccount.accountName,
            bankCode: nibssAccount.bankCode,
            balance: nibssAccount.balance
        });

        res.status(201).json({
            message: "Account created successfully",
            account
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create account",
            error: error.response?.data || error.message
        });
    }
};