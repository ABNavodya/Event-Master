const BookingModel = require('../model/booking.model');
const saveBooking = async (req, res) => {
    try {
        const {_id, user_id, user_name, total_booking} = req.body
        const data = {
            _id: _id,
            user_id: user_id,
            user_name: user_name,
            total_booking: total_booking,
        }
        await BookingModel.create(data).then(data => {
            return res.json({
                message: 'Booking Added!',
                data: data
            });
        }).catch(err => {
            if (err) {
                return res.json({
                    message: 'Booking saving fail! Please login'
                });
            }
        });
    } catch (err) {
    }
}

const getBookingID = async (req, res) => {
    try {
        try {
            const getBookingID = await BookingModel.countDocuments();
            let newId = Number(getBookingID) + 1;
            res.send(newId.toString());
        } catch (err) {
            res.send('Error ' + err.message)
        }
    } catch (err) {
    }
}

module.exports = { saveBooking, getBookingID }