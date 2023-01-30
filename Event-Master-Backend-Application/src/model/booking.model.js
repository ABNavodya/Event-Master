const {Schema, model} = require("mongoose");

const BookingSchema = new Schema({
    _id:{
        type: Number
    },
    user_id: {
        type: String,
        required: true,
    },
    user_name:{
        type: String,
        required: true,
    },
    total_booking:{
        type: String,
        required: true,
    }
});

module.exports = model('booking', BookingSchema);