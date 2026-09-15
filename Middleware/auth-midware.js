const jwt = require("jsonwebtoken");
const Customer = require("../Models/customer");

exports.protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
const customer = await Customer.findById(decoded.id).select("-password");
       
        if (!customer) {
            return res.status(401).json({
                message: "Customer not found"
            });
        }

        req.user = customer;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};