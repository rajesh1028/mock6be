const express = require("express");
const { FlightModel } = require("../models/flight.model");

const flightRouter = express.Router();

flightRouter.get("/flights", async (req, res) => {
    let query = req.query;
    try {
        let flights = await FlightModel.find(query);
        res.status(200).send(flights);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

flightRouter.get("/flights/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let flight = await FlightModel.findById(id);
        res.status(200).send(flight);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

flightRouter.post("/flights", async (req, res) => {
    const { airline, flightNo, departure, arrival, seats, price } = req.body;
    let departureTime = new Date();
    let arrivalTime = new Date();
    try {
        let flight = new FlightModel({ airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price });
        await flight.save();
        res.status(201).send("Flight created successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

flightRouter.patch("/flights/:id", async (req, res) => {
    let id = req.params.id;
    const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
    try {
        let flight = await FlightModel.findByIdAndUpdate(id, { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price });
        res.status(204).send("flight data updated successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

flightRouter.delete("/flights/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let flight = await FlightModel.findByIdAndDelete(id);
        res.status(202).send("flight data deleted successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = { flightRouter }