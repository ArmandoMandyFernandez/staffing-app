const AWS = require("../config/awsConfig");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createEvent = async (eventData) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: eventData,
    };

    return dynamoDb.put(params).promise();
};

module.exports = {
    createEvent,
};
