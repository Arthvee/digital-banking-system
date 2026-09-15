const { nibssRequest } = require("./nibss");

// handles transfer between bank and nibss
const transferHandler = async (transferData) => {
    return await nibssRequest("/api/transfer", {
        method: "POST",
        data: transferData
    });
};

module.exports = {transferHandler};