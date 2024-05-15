// routes/eventRoutes.js
const express = require('express');
const { createNewEvent, getEventById, updateEvent, deleteEvent, listEvents } = require('../controllers/eventController');

const router = express.Router();

router.post('/events', createNewEvent);
router.get('/events/:eventId', getEventById);
router.put('/events/:eventId', updateEvent);
router.delete('/events/:eventId', deleteEvent);
router.get('/events', listEvents);

module.exports = router;
