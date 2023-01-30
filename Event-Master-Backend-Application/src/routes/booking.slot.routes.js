const express = require('express');
const bookingSlotController = require('../controller/booking.slot.controller');

const router = express.Router();

router.post('/booking-slot-save', bookingSlotController.saveSlot);
router.get('/booking-slot-tot', bookingSlotController.getSlotValue);
router.put('/booking-slot-update/:_id', bookingSlotController.updateSlot);

module.exports = router;