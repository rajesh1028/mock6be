const express = require("express");
const { connection } = require("./configs/db");
const cors = require("cors");

const { userRouter } = require("./router/userRoute");
const { flightRouter } = require("./router/flightRoute");
const { bookingRouter } = require("./router/bookingRoute");


const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.status(200).send("Home Page");
});

app.use("/api", userRouter);
app.use("/api", flightRouter);
app.use("/api", bookingRouter);


app.listen(8000, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("server is listening at port 8000");
})