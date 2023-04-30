const express = require("express");
  const noteRouter = express.Router();
  const mongoose = require("mongoose");
  const {NoteModel} = require("../model/note.model");
  const {authorization} =require('../middleware/auth.middleware')
  const bcrypt = require('bcrypt');
  const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

    noteRouter.use(authorization);

  noteRouter.get("/note" , async(req , res) => {
    //   const data = await NoteModel.find();
    //     console.log(data);
    try{
          let notedata = await NoteModel.find({authorID : req.body.authorID});
              res.send(notedata);
    }

    catch(err){
          res.send(err);
    }
  })

  noteRouter.post("/addnote" , async(req , res) => {
   
         try{
              let newNote = new NoteModel(req.body);
              await newNote.save();
              res.send({msg:"new note added"})
         } 

         catch(err){
              res.send(err)
         }
})

  noteRouter.patch("/updatenote/:noteid" , async(req , res) => {
        const {noteid} = req.params;
       const note = await NoteModel.findOne({_id:noteid});
         if(note.authorID !== req.body.authorID){
              res.send({"msg" : "Not authorized"})
         }

         else {

         await NoteModel.findByIdAndUpdate({_id:noteid} , req.body);
         res.send({msg:"note data successfully updated"});

         }
  })

       noteRouter.delete("/deletenote/:noteid",async(req,res)=>{
            
        const {noteid} = req.params;
        const note = await NoteModel.findOne({_id:noteid});
          if(note.authorID !== req.body.authorID){
               res.send({"msg" : "Not authorized"})
          }
 
          else {
 
          await NoteModel.findByIdAndDelete({_id:noteid});
          res.send({msg:"note data successfully deleted"});
 
          }
       })
    
  

    module.exports={noteRouter};