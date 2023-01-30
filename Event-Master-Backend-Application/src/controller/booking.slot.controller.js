const BookingSlotModel = require('../model/booking.slot.model');
const saveSlot = async (req, res) => {
    try {
        const {_id, availableSlot} = req.body
        const data = {
            _id: _id,
            availableSlot: availableSlot,
        }
        await BookingSlotModel.create(data).then(data => {
            return res.json({
                message: 'Booking Slot Added!',
                data: data
            });
        }).catch(err => {
            if (err) {
                return res.json({
                    message: 'Booking slot saving fail! Please login'
                });
            }
        });
    } catch (err) {
    }
};
const getSlotValue = async (req, res) => {
    try {
        const slotID = 1;
        const data = await BookingSlotModel.findOne({"_id": slotID})
        if (data !== null) {
            res.send(data.availableSlot);
        } else {
            return res.json({
                message: 'error!'
            })
        }
    } catch (err) {
    }
}
const updateSlot = async (req, res) => {
    try {
        const data = await BookingSlotModel.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {data}
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

module.exports = {saveSlot, updateSlot, getSlotValue}