const { transferHandler } = require("../Services/transfer-handling");
const Account = require("../Models/account");
const Transaction = require("../Models/transaction");

exports.transferFunds = async (req, res) => {
    try {
        const { from, to, amount } = req.body;

        const senderAccount = await Account.findOne({
            accountNumber: from
        });

        if (!senderAccount) {
            return res.status(404).json({
                message: "Sender account not found"
            });
        }

        if (!senderAccount.customer.equals(req.user._id)) {
    return res.status(403).json({
        message: "You are not authorized to transfer from this account"
    });
}

        const recipientAccount = await Account.findOne({
            accountNumber: to
        });

        const transferType = recipientAccount
            ? "intra-bank"
            : "inter-bank";

        const result = await transferHandler(req.body);

        const transaction = await Transaction.create({
            senderCustomer: senderAccount.customer,

            recipientCustomer: recipientAccount
                ? recipientAccount.customer
                : undefined,

            senderAccount: result.senderAccount,
            receiverAccount: result.receiverAccount,
            amount: result.amount,
            reference: result.reference,
            status: result.status,
            transferType
        });

        res.status(200).json({
            message: "Transfer successful",
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: "Transfer failed",
            error: error.response?.data || error.message
        });
    }
};