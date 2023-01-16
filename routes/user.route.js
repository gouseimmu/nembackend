const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/register", async (req, res) => {
    const { email, pass, name, age } = req.body;
    try {
      bcrypt.hash(pass, 5, async (err, secure_password) => {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({ email, pass: secure_password, name, age });
          await user.save();
          res.send("Registeration done");
        }
      });
    } catch (err) {
      res.send("Error in Registeration ");
      console.log(err);
    }
  });
  

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
      // Load hash from your password DB.
      const user = await UserModel.find({ email });
      //console.log(user)
      if (user.length > 0) {
        bcrypt.compare(pass, user[0].pass, (err, result) => {
          if (result) {
            const token = jwt.sign({userID:user[0]._id}, process.env.key);
            res.send({ msg: "LogIn Successful", token: token });
          } else {
            res.send("Wrong Credentials");
            console.log(err)
          }
        });
      } else {
          res.send("Wrong Credentials");
      }
    } catch (err) {
      res.send("Error in LoggingIn");
      console.log(err);
    }
  });

  userRouter.get("/", async(req, res) => {
    const all_users= await UserModel.find()
    res.send(all_users);
});
  
 

  module.exports={
    userRouter
  }