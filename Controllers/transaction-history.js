const Transaction = require("../Models/transaction");

exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { senderCustomer: req.user._id },
                { recipientCustomer: req.user._id }
            ]
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "Transaction history retrieved successfully",
            transactions
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve transaction history",
            error: error.message
        });
    }
};