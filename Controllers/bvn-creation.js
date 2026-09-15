const { insertBvn, validateBvn } = require("../services/bvn-validator");
const Customer = require("../Models/customer");
const bcrypt = require("bcryptjs");

exports.createBvn = async (req, res) => {
    try {
        const {
            bvn,
            firstName,
            lastName,
            dob,
            phone,
            email,
            password
        } = req.body;

        const existingCustomer = await Customer.findOne({
            $or: [
                { email },
                {
                    kycType: "bvn",
                    kycID: bvn
                }
            ]
        });

        if (existingCustomer) {
            return res.status(400).json({
                message: "Customer already exists"
            });
        }

        const bvnData = {
            bvn,
            firstName,
            lastName,
            dob,
            phone
        };

        const result = await insertBvn(bvnData);

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dob,
            phone,
            kycType: "bvn",
            kycID: bvn,
            isVerified: false
        });

        res.status(201).json({
    message: "BVN created successfully",
    data: result,
    customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        dob: customer.dob,
        kycType: customer.kycType,
        isVerified: customer.isVerified
    }
});

    } catch (error) {
        res.status(500).json({
            message: "Failed to create BVN",
            error: error.response?.data || error.message
        });
    }
};

exports.verifyBvn = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            kycType: "bvn",
            kycID: req.body.bvn
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const result = await validateBvn(req.body.bvn);

        customer.isVerified = true;

        await customer.save();

        res.status(200).json({
            message: "BVN validated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to validate BVN",
            error: error.response?.data || error.message
        });
    }
};