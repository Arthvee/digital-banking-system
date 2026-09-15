const {insertNin,validateNin} = require("../Services/nin-validation");
const Customer = require("../Models/customer");
const bcrypt = require("bcryptjs");

exports.createNin = async (req, res) => {
    try {
        const {
            nin,
            firstName,
            lastName,
            dob,
            email,
            password
        } = req.body;

        const existingCustomer = await Customer.findOne({
            $or: [
                { email },
                {
                    kycType: "nin",
                    kycID: nin
                }
            ]
        });

        if (existingCustomer) {
            return res.status(400).json({
                message: "Customer already exists"
            });
        }

        const ninData = {
            nin,
            firstName,
            lastName,
            dob
        };

        const result = await insertNin(ninData);

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dob,
            kycType: "nin",
            kycID: nin,
            isVerified: false
        });

            res.status(201).json({
    message: "NIN created successfully",
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
            message: "Failed to create NIN",
            error: error.response?.data || error.message
        });
    }
};

exports.verifyNin = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            kycType: "nin",
            kycID: req.body.nin
        });

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const result = await validateNin(req.body.nin);

        customer.isVerified = true;

        await customer.save();

        res.status(200).json({
            message: "NIN validated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to validate NIN",
            error: error.response?.data || error.message
        });
    }
};