const {transactionStatusHandler} = require("../Services/transact-handling");

const Transaction = require("../Models/transaction");

exports.getTransactionStatus = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            reference: req.params.reference
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        const isSender =
            transaction.senderCustomer?.equals(req.user._id);

        const isRecipient =
            transaction.recipientCustomer?.equals(req.user._id);

        if (!isSender && !isRecipient) {
            return res.status(403).json({
                message: "You are not authorized to view this transaction"
            });
        }

        const result = await transactionStatusHandler(
            req.params.reference
        );

        res.status(200).json({
            message: "Transaction status retrieved successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve transaction status",
            error: error.response?.data || error.message
        });
    }
};