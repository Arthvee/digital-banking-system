const { nibssRequest } = require("./nibss");

//handles  creating and validating bvn between bank and nibss

const insertBvn = async (bvnData) => {
    return await nibssRequest("/api/insertBvn", {
        method: "POST",
        data: bvnData
    });
};

const validateBvn = async (bvn) => {
    return await nibssRequest("/api/validateBvn", {
        method: "POST",
        data: {
            bvn
        }
    });
};

module.exports = {
    insertBvn,
    validateBvn
};