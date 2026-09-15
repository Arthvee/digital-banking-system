const { nameEnquiryHandler } = require("../Services/name-enquiryhandling");

exports.nameEnquiry = async (req, res) => {
    try {
        const result = await nameEnquiryHandler(req.params.accountNumber);

        res.status(200).json({
            message: "Name enquiry successful",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Name enquiry failed",
            error: error.response?.data || error.message
        });
    }
};