const AWS = require("../config/awsConfig");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { createEvent } = require("../models/eventModel");

const createNewEvent = async (req, res) => {
    const {
        eventId,
        eventName,
        eventLocation,
        eventDate,
        employees,
        eventTime,
        eventStatus,
    } = req.body;

    const eventData = {
        eventId,
        eventName,
        eventLocation,
        eventDate,
        employees,
        eventTime,
        eventStatus,
    };

    try {
        await createEvent(eventData);
        res.status(201).send("Event created successfully");
    } catch (error) {
        res.status(500).send("Error creating event");
    }
};

const getEventById = async (req, res) => {
    const { eventId } = req.params;

    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { eventId },
    };

    try {
        const result = await dynamoDb.get(params).promise();
        if (result.Item) {
            res.status(200).json(result.Item);
        } else {
            res.status(404).send("Event not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching event");
    }
};

const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const {
        eventName,
        eventLocation,
        eventDate,
        employees,
        eventTime,
        eventStatus,
    } = req.body;

    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { eventId },
        UpdateExpression:
            "set eventName = :name, eventLocation = :location, eventDate = :date, employees = :employees, eventTime = :time, eventStatus = :status",
        ExpressionAttributeValues: {
            ":name": eventName,
            ":location": eventLocation,
            ":date": eventDate,
            ":employees": employees,
            ":time": eventTime,
            ":status": eventStatus,
        },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const result = await dynamoDb.update(params).promise();
        res.status(200).json(result.Attributes);
    } catch (error) {
        res.status(500).send("Error updating event");
    }
};

const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { eventId },
    };

    try {
        await dynamoDb.delete(params).promise();
        res.status(200).send("Event deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting event");
    }
};

const listEvents = async (req, res) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        res.status(200).json(result.Items);
    } catch (error) {
        res.status(500).send("Error fetching events");
    }
};

module.exports = {
    createNewEvent,
    getEventById,
    updateEvent,
    deleteEvent,
    listEvents,
};
