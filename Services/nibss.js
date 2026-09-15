const axios = require("axios");

const BASE_URL = process.env.NIBSS_BASE_URL;

let accessToken = null;

const getAccessToken = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/token`, {
            apiKey: process.env.NIBSS_API_KEY,
            apiSecret: process.env.NIBSS_API_SECRET
        });

        accessToken = response.data.token;

        return accessToken;
    } catch (error) {
        console.error(
            "Failed to generate NIBSS token:",
            error.response?.data || error.message
        );

        throw error;
    }
};

const nibssRequest = async (endpoint, options = {}) => {
    if (!accessToken) {
        await getAccessToken();
    }

    try {
        const response = await axios({
            url: `${BASE_URL}${endpoint}`,
            ...options,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                ...options.headers
            }
        });

        return response.data;
    } catch (error) {
        console.error(
            "NIBSS request failed:",
            error.response?.data || error.message
        );

        throw error;
    }
};

module.exports = {getAccessToken,nibssRequest};