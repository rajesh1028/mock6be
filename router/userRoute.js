const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();


userRouter.get("/", async (req, res) => {
    try {
        let users = await UserModel.find();
        res.send(users);
    } catch (error) {
        res.send(error);
    }
})

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                let user = new UserModel({ name, email, password: secure_password });
                await user.save();
                res.status(201).send("Registered successfully");
            }
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        let hashed_password = user.password;
        if (user) {
            bcrypt.compare(password, hashed_password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, "unlockkey", { expiresIn: '2h' })
                    res.status(201).send({ "msg": "Login Successful", "token": token });
                } else {
                    res.send("Wrong credentials");
                }
            })
        } else {
            res.send("Wrong credentials");
        }
    } catch (error) {
        console.log(error)
        res.send("Error in login in")
    }
})


module.exports = { userRouter }