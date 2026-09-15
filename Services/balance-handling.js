const { nibssRequest } = require("./nibss");

// getting balance from nibss
const balanceHandler = async (accountNumber) => {
    return await nibssRequest(`/api/account/balance/${accountNumber}`,
        {
            method: "GET"
        }
    );
};

module.exports = {balanceHandler};