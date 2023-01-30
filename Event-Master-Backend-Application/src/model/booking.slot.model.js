const {Schema, model} = require("mongoose");

const BookingSlotSchema = new Schema({
    _id:{
        type: Number
    },
    availableSlot: {
        type: String,
        required: true,
        unique:true,
    }
});

module.exports = model('booking_slots', BookingSlotSchema);