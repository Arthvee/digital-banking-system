const { nibssRequest } = require("./nibss");

const transactionStatusHandler = async (reference) => {
    return await nibssRequest(`/api/transaction/${reference}`,
        {
            method: "GET"
        }
    );
};

module.exports = {
    transactionStatusHandler
};