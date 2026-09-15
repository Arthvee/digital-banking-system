const { nibssRequest } = require("./nibss");

const insertNin = async (ninData) => {
    return await nibssRequest("/api/insertNin", {
        method: "POST",
        data: ninData
    });
};

const validateNin = async (nin) => {
    return await nibssRequest("/api/validateNin", {
        method: "POST",
        data: {
            nin
        }
    });
};

module.exports = {insertNin,validateNin};