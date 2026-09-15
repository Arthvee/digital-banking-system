exports.validateNin = (req, res, next) => {
    const {
        nin,
        firstName,
        lastName,
        dob,
        email,
        password
    } = req.body;

    if (
        !nin ||
        !firstName ||
        !lastName ||
        !dob ||
        !email ||
        !password
    ) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    if (!/^\d{11}$/.test(nin)) {
        return res.status(400).json({
            message: "NIN must contain exactly 11 digits"
        });
    }

    if (
        typeof firstName !== "string" ||
        typeof lastName !== "string"
    ) {
        return res.status(400).json({
            message: "First name and last name must be strings"
        });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        return res.status(400).json({
            message: "Date of birth must be in YYYY-MM-DD format"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    next();
};