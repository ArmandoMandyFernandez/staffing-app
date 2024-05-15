const AWS = require("aws-sdk");
require("dotenv").config();

// Configure AWS with your access and secret key.
AWS.config.update({
    region: process.env.AWS_REGION, // Set in your .env file
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set in your .env file
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set in your .env file
});

module.exports = AWS;
