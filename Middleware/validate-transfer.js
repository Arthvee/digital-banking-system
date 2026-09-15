exports.validateTransfer = (req, res, next) => {
    const { from, to, amount } = req.body;

    if (!from || !to || amount === undefined) {
        return res.status(400).json({
            message: "From account, to account and amount are required"
        });
    }

    if (typeof from !== "string" || typeof to !== "string") {
        return res.status(400).json({
            message: "Account numbers must be strings"
        });
    }

    if (
        typeof amount !== "number" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        return res.status(400).json({
            message: "Amount must be a valid number greater than zero"
        });
    }

    if (from === to) {
        return res.status(400).json({
            message: "Sender and receiver accounts cannot be the same"
        });
    }

    next();
};