  const express = require("express");
  const userRouter = express.Router();
  const mongoose = require("mongoose");
  const {UserModel} = require("../model/user.model");
  const bcrypt = require('bcrypt');
  const jwt = require("jsonwebtoken");

  userRouter.post("/register" , async(req , res) => {
          const {name,email,pass,age} = req.body;
          bcrypt.hash(pass, 5, async function(err, hash) {
             const userdata = new UserModel({name,email,pass:hash,age});
             await userdata.save();
             res.status(200).send("user data added");
        });

        console.log("Data has been added");

  })

  userRouter.post("/login" , async(req , res) => {
       const {email,pass} = req.body;
       const userData = await UserModel.findOne({email:email})
       bcrypt.compare(pass, userData.pass, function(err, result) {
        if(result){
             const token = jwt.sign({ authorID:userData._id, author:userData.name }, 'masai');
             res.status(200).send({msg:"login successfull" , token : token})
        }

        else {
            res.send({msg:"wrong credential"});
        }
        
    });
  })

    module.exports={userRouter};
