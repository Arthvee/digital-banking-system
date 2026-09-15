const { balanceHandler } = require("../Services/balance-handling");
const Account = require("../Models/account");

exports.getBalance = async (req, res) => {
    try {
        const account = await Account.findOne({
            accountNumber: req.params.accountNumber
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        if (!account.customer.equals(req.user._id)) {
            return res.status(403).json({
                message: "You are not authorized to view this account balance"
            });
        }

        const result = await balanceHandler(
            req.params.accountNumber
        );

        res.status(200).json({
            message: "Balance retrieved successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve balance",
            error: error.response?.data || error.message
        });
    }
};