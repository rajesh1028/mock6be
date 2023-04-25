const mongoose = require("mongoose");

let ObjectId = mongoose.Schema.ObjectId;

const bookingSchema = mongoose.Schema({
    user: { type: ObjectId, ref: 'user' },
    flight: { type: ObjectId, ref: 'flight' }
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = { BookingModel }