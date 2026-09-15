const { nibssRequest } = require("./nibss");

const nameEnquiryHandler = async (accountNumber) => {
    return await nibssRequest(
        `/api/account/name-enquiry/${accountNumber}`,
        {
            method: "GET"
        }
    );
};

module.exports = {nameEnquiryHandler};