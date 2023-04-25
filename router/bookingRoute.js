const express = require("express");
const { BookingModel } = require("../models/booking.model");
const { UserModel } = require("../models/user.model");
const { FlightModel } = require("../models/flight.model");

const bookingRouter = express.Router();

bookingRouter.post("/booking", async (req, res) => {
    try {
        let { user, flight } = req.body;
        let booking = new BookingModel({ user, flight });
        await booking.save();
        res.status(201).send("Booking successfull");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

bookingRouter.get("/dashboard", async (req, res) => {
    try {
        let arr = [];
        let data = await BookingModel.find();
        data.forEach(async (elem, i) => {
            try {
                let user = await UserModel.findById(elem.user);
                let flight = await FlightModel.findById(elem.flight);
                arr.push({ user, flight });
            } catch (error) {
                console.log(error);
            }
        });

        setTimeout(() => {
            res.status(200).send(arr);
        }, 1500)

    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


module.exports = { bookingRouter }