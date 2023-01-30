const express = require('express');
const bookingController = require('../controller/booking.controller');

const router = express.Router();

router.post('/booking-save', bookingController.saveBooking);
router.get('/booking-id-count', bookingController.getBookingID);

module.exports = router;