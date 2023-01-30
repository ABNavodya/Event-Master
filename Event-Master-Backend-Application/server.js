const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const env = process.env;

const UserRoute = require('./src/routes/user.routes');
const BookingSlot = require('./src/routes/booking.slot.routes');
const Booking = require('./src/routes/booking.routes');

app.use('/api', UserRoute);
app.use('/api', BookingSlot);
app.use('/api', Booking);

mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://Navodya:${env.PASSWORD}@eventmastercluster.qoytjdf.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
    app.listen(env.PORT || 8800, () => {
        console.log("DB connected !!!")
        console.log(`Server is Starting !!! | PORT ${env.PORT}`)
    })
}).catch(err => {
    if (err)
        console.log(err.message)
});