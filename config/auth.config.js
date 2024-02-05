require('dotenv').config();

const config = { jwtSecret: process.env.JWT_SECRET, adminCode: process.env.ADMIN_CODE };

module.exports = config;