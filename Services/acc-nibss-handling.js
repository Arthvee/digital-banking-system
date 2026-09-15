const { nibssRequest } = require("./nibss");


// handles account creation after onboarding between bank and nibss

const accNibssHandler = async (accountData) => {
    return await nibssRequest("/api/account/create", {
        method: "POST",
        data: accountData
    });
};

module.exports = {accNibssHandler};